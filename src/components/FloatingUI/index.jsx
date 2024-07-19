import {
    Children,
    cloneElement,
    forwardRef,
    isValidElement,
    useEffect,
    useRef,
    useState
  } from "react";
  import {
    useFloating,
    autoUpdate,
    flip,
    offset,
    shift,
    useRole,
    useDismiss,
    useInteractions,
    useListNavigation,
    useTypeahead,
    FloatingPortal,
    FloatingFocusManager,
    FloatingOverlay
  } from "@floating-ui/react";

  const selectionOnlyMenuId = ['bold-italic', 'dashes-between']
  
  export const MenuItem = forwardRef(({ id, label, disabled, quillRef, ...props }, ref) => {
    const selection = quillRef.current.getSelection();
    const currentFormat = quillRef.current.getFormat(selection?.index, selection?.length);
    
    const isBoldItalic = (format) => Object.keys(format).includes('bold') && Object.keys(format).includes('italic');
    const textColor = !disabled ? isBoldItalic(currentFormat) && id === 'bold-italic' ? 'text-blue-500' : undefined : 'text-[#ddd]';
    const menuVisibility = (!selection || selection?.length === 0) && selectionOnlyMenuId.includes(id) ? 'hidden' : 'block';
    return (
      <button
        {...props}
        className={`w-full p-1 bg-white border-none rounded-[4px] text-base text-left m-0 outline-none focus:bg-gray-300 
            ${textColor} ${menuVisibility}
        `}
        ref={ref}
        role="menuitem"
        disabled={disabled}
      >
        {label}
      </button>
    );
  });
  
  export const Menu = forwardRef(({ children, quillRef }) => {
    const [activeIndex, setActiveIndex] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
  
    const listItemsRef = useRef([]);
    const listContentRef = useRef(
      Children.map(children, (child) =>
        isValidElement(child) ? child.props.label : null
      )
    );
    const allowMouseUpCloseRef = useRef(false);
  
    const { refs, floatingStyles, context } = useFloating({
      open: isOpen,
      onOpenChange: setIsOpen,
      middleware: [
        offset({ mainAxis: 5, alignmentAxis: 4 }),
        flip({
          fallbackPlacements: ["left-start"]
        }),
        shift({ padding: 10 })
      ],
      placement: "right-start",
      strategy: "fixed",
      whileElementsMounted: autoUpdate
    });
  
    const role = useRole(context, { role: "menu" });
    const dismiss = useDismiss(context);
    const listNavigation = useListNavigation(context, {
      listRef: listItemsRef,
      onNavigate: setActiveIndex,
      activeIndex
    });
    const typeahead = useTypeahead(context, {
      enabled: isOpen,
      listRef: listContentRef,
      onMatch: setActiveIndex,
      activeIndex
    });
  
    const { getFloatingProps, getItemProps } = useInteractions([
      role,
      dismiss,
      listNavigation,
      typeahead
    ]);
  
    useEffect(() => {
      let timeout;
  
      function onContextMenu(e) {
        e.preventDefault();
  
        refs.setPositionReference({
          getBoundingClientRect() {
            return {
              width: 0,
              height: 0,
              x: e.clientX,
              y: e.clientY,
              top: e.clientY,
              right: e.clientX,
              bottom: e.clientY,
              left: e.clientX
            };
          }
        });
  
        setIsOpen(true);
        clearTimeout(timeout);
  
        allowMouseUpCloseRef.current = false;
        timeout = window.setTimeout(() => {
          allowMouseUpCloseRef.current = true;
        }, 300);
      }
  
      function onMouseUp() {
        if (allowMouseUpCloseRef.current) {
          setIsOpen(false);
        }
      }
  
      document.addEventListener("contextmenu", onContextMenu);
      document.addEventListener("mouseup", onMouseUp);
      return () => {
        document.removeEventListener("contextmenu", onContextMenu);
        document.removeEventListener("mouseup", onMouseUp);
        clearTimeout(timeout);
      };
    }, [refs]);
  
    return (
      <FloatingPortal>
        {isOpen && (
          <FloatingOverlay lockScroll>
            <FloatingFocusManager context={context} initialFocus={refs.floating}>
              <div
                className="outline-none bg-white border border-[#ddd] p-1 rounded-lg"
                ref={refs.setFloating}
                style={{...floatingStyles, boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}
                {...getFloatingProps()}
              >
                {Children.map(
                  children,
                  (child, index) =>
                    isValidElement(child) &&
                    cloneElement(
                      child,
                      getItemProps({
                        tabIndex: activeIndex === index ? 0 : -1,
                        ref(node) {
                          listItemsRef.current[index] = node;
                        },
                        onClick() {
                          child.props.onClick?.();
                          setIsOpen(false);
                        },
                        onMouseUp() {
                          child.props.onClick?.();
                          setIsOpen(false);
                        },
                        quillRef
                      })
                    )
                )}
              </div>
            </FloatingFocusManager>
          </FloatingOverlay>
        )}
      </FloatingPortal>
    );
  });
  