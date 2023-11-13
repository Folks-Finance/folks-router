export const  truncateText =(inputText : string | undefined, maxLength : number) => {
    //@ts-ignore
      if (inputText?.length <= maxLength) {
        // If the input text has 8 characters or less, return it as is.
        return inputText;
      } else {
        // Otherwise, truncate and format the text.
        const firstFourDigits = inputText?.slice(0, 5);
        const lastFourDigits = inputText?.slice(-5);
        return `${firstFourDigits}...${lastFourDigits}`;
      }
    }