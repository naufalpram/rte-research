const toBold = (content) => `<strong>${content}</strong>`;
const toItalic = (content) => `<em>${content}</em>`;
const toUnderline = (content) => `<u>${content}</u>`;
const toHeading = (content, headingNum) => `<${headingNum}>${content}</${headingNum}>`;
const insertBreak = (content = '') => content.replace('\n', '<br>');

export const convertToMarkup = ({ ops }) => {
    let payload = '';
    if (ops.length === 0) return '';
    console.log(ops);
    ops.forEach((operation) => {
        const opsKeys = Object.keys(operation);
        if (!opsKeys.includes('attributes')) {
            payload += operation?.insert ? insertBreak(operation.insert) : '';
            return;
        } else {
            let text = operation?.insert;
            const attr = Object.keys(operation.attributes);
            if (attr.includes('bold')) text = toBold(text); 
            if (attr.includes('italic')) text = toItalic(text);
            if (attr.includes('underline')) text = toUnderline(text);

            if (attr.includes('header')) text = toHeading(text, `h${operation.attributes.header}`)
            else text = insertBreak(text);
            
            payload += text;
        }
    });

    return payload;
}