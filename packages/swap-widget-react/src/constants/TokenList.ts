


export type I_TokenList = {
    label: string;
    title: string;
    assetId: number;
    assetDecimal: number;
    mainnetAssetId: number | null;
    src: string;
    price?: {};
}

export const TokenObject: any = {
    0: {
        label: 'Algo',
        title: 'Algo',
        assetId: 0,
        assetDecimal: 6,
        amount: 0,
        // mainnetAssetId: 0,
        src: "https://github.com/tinymanorg/asa-list/blob/review/assets/ALGO/icon.png?raw=true"

    },
    167184545: {
        label: 'gALGO',
        title: 'gALGO',
        assetId: 167184545,
        assetDecimal: 6,
        amount: 0,
        mainnetAssetId: 793124631,
        src: "https://github.com/tinymanorg/asa-list/blob/review/assets/gALGO-793124631/icon.png?raw=true"

    },
    67395862: {
        label: 'USDC',
        title: 'USD Coin',
        assetId: 67395862,
        assetDecimal: 6,
        amount: 0,
        mainnetAssetId: 31566704,
        src: "https://github.com/tinymanorg/asa-list/blob/review/assets/USDC-31566704/icon.png?raw=true"

    },
    67396430: {
        label: 'USDt',
        title: 'Tether',
        assetId: 67396430,
        assetDecimal: 6,
        amount: 0,
        mainnetAssetId: 312769,
        src: "https://github.com/tinymanorg/asa-list/blob/review/assets/USDt-312769/icon.png?raw=true"

    },
    67396528: {
        label: 'goBTC',
        title: 'Bitcoin',
        assetId: 67396528,
        assetDecimal: 8,
        amount: 0,
        mainnetAssetId: 386192725,
        src: "https://github.com/tinymanorg/asa-list/blob/review/assets/goBTC-386192725/icon.png?raw=true"
    },
    76598897: {
        label: 'goETH',
        title: 'Ethereum',
        assetId: 76598897,
        assetDecimal: 8,
        amount: 0,
        mainnetAssetId: 386195940,
        src: "https://github.com/tinymanorg/asa-list/blob/review/assets/goETH-386195940/icon.png?raw=true"

    }
}

const TokenList: I_TokenList[] = [
    {
        label: 'Algo',
        title: 'Algo',
        assetId: 0,
        assetDecimal: 6,
        mainnetAssetId: null,
        src: "https://github.com/tinymanorg/asa-list/blob/review/assets/ALGO/icon.png?raw=true"
    },
    {
        label: 'gALGO',
        title: 'gALGO',
        assetId: 167184545,
        assetDecimal: 6,
        mainnetAssetId: 793124631,
        src: "https://github.com/tinymanorg/asa-list/blob/review/assets/gALGO-793124631/icon.png?raw=true"
    },
    {
        label: 'USDC',
        title: 'USD Coin',
        assetId: 67395862,
        assetDecimal: 6,
        mainnetAssetId: 31566704,
        src: "https://github.com/tinymanorg/asa-list/blob/review/assets/USDC-31566704/icon.png?raw=true"

    },
    {
        label: 'USDt',
        title: 'Tether',
        assetId: 67396430,
        assetDecimal: 6,
        mainnetAssetId: 312769,
        src: "https://github.com/tinymanorg/asa-list/blob/review/assets/USDt-312769/icon.png?raw=true"

    },
    {
        label: 'goBTC',
        title: 'Bitcoin',
        assetId: 67396528,
        assetDecimal: 8,
        mainnetAssetId: 386192725,
        src: "https://github.com/tinymanorg/asa-list/blob/review/assets/goBTC-386192725/icon.png?raw=true"
    },
    {
        label: 'goETH',
        title: 'Ethereum',
        assetId: 76598897,
        assetDecimal: 8,
        mainnetAssetId: 386195940,
        src: "https://github.com/tinymanorg/asa-list/blob/review/assets/goETH-386195940/icon.png?raw=true"
    },

]


export default TokenList;