const { Translate } = require('@google-cloud/translate').v2;

// Initialize the Google Cloud Translate client with your API key
const translate = new Translate({
    keyFilename: '../config/exploreease-travel-app-440004-501f91977931.json'
});

const translateText = async (text, targetLanguage) => {
    try {
        const [translation] = await translate.translate(text, targetLanguage);
        return translation;
    } catch (error) {
        console.error('Error translating text:', error);
        return null;
    }
};

module.exports = translateText;
