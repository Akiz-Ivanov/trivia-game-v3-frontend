const insertSoftHyphens = (text: string, maxWordLength = 20, hyphenInterval = 20): string => {
    
    return text
        .split(' ')
        .map(word => {
            if (word.length <= maxWordLength) return word;

            let result = '';
            for (let i = 0; i < word.length; i += hyphenInterval) {
                result += word.slice(i, i + hyphenInterval) + '\u00AD';
            }
            return result;
        })
        .join(' ');
}

export default insertSoftHyphens