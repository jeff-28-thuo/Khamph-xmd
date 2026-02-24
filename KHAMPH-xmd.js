const { default: makeWASocket, useMultiFileAuthState } = require("@whiskeysockets/baileys");
const pino = require('pino');
const readline = require("readline");

const color = [
    '\x1b[31m', 
    '\x1b[32m', 
    '\x1b[33m', 
    '\x1b[34m', 
    '\x1b[35m', 
    '\x1b[36m', 
    '\x1b[37m',
    '\x1b[90m' 
];
const xeonColor = color[Math.floor(Math.random() * color.length)];

const xColor = '\x1b[0m';

const question = (text) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    return new Promise((resolve) => { rl.question(text, resolve) });
};

async function XeonProject() {
    const { state } = await useMultiFileAuthState('./KHAMPHTz/session');
    const KHAMPHTechInc = makeWASocket({
        logger: pino({ level: "silent" }),
        printQRInTerminal: false,
        auth: state,
        connectTimeoutMs: 60000,
        defaultQueryTimeoutMs: 0,
        keepAliveIntervalMs: 10000,
        emitOwnEvents: true,
        fireInitQueries: true,
        generateHighQualityLinkPreview: true,
        syncFullHistory: true,
        markOnlineOnConnect: true,
        browser: ["Ubuntu", "Chrome", "20.0.04"],
    });
    try {
        const phoneNumber = await question(xeonColor + 'Enter target number🤙 : ' + xColor);
        const xeonCodes = parseInt(await question(xeonColor + 'Amount 😽 : '+ xColor));

        if (isNaN(xeonCodes) || xeonCodes <= 0) {
            console.log('example : 20.');
            return;
        }

        for (let i = 0; i < xeonCodes; i++) {
            try {
                let code = await KHAMPHTechInc.requestPairingCode(phoneNumber);
                code = code?.match(/.{1,4}/g)?.join("-") || code;
                console.log(xeonColor + `${phoneNumber} [${i + 1}/${xeonCodes}]`+ xColor);
            } catch (error) {
                console.error('Error:', error.message);
            }
        }
    } catch (error) {
        console.error('error') ;
    }

    return KHAMPHTechInc;
}

// New banner displaying KHAMPH-XMD
console.log(xeonColor + `╔══════════════════════════════════════╗`);
console.log(xeonColor + `║          KHAMPH-XMD                 ║`);
console.log(xeonColor + `╚══════════════════════════════════════╝` + xColor);

XeonProject();
