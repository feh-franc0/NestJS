const { DisconnectReason } = require('@whiskeysockets/baileys')
const { useMultiFileAuthState } = require('@whiskeysockets/baileys')
const makeWASocket = require('@whiskeysockets/baileys').default

const getAutoShopAIResponse = require('./api')

const qaPairs = require('./baseDados') // Caminho para o móduloconst { findBestResponse } = require('./learnAnswer'); // Caminho para o módulo
const { findBestResponse } = require('./learnAnswer') // Caminho para o módulo

async function connectionLogic() {
  const { state, saveCreds } = await useMultiFileAuthState('auth_info_baileys')
  const sock = makeWASocket({
    auth: state,
    printQRInTerminal: true,
  })

  sock.ev.on('connection.update', (update) => {
    const { connection, lastDisconnect, qr } = update || {}

    if (qr) {
      console.log(qr)
    }

    if (connection === 'close') {
      const shouldReconnect =
        lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut

      console.log(
        'connection closed due to ',
        lastDisconnect.error,
        ', reconnecting ',
        shouldReconnect,
      )

      if (shouldReconnect) {
        connectionLogic()
      }
    } else if (connection === 'open') {
      console.log('opened connection')
    }
  })

  sock.ev.on('creds.update', saveCreds)

  sock.ev.on('messages.upsert', async (m) => {
    const senderNumber = m.messages[0]?.key.remoteJid
    const receivedMessage =
      m.messages[0]?.message?.extendedTextMessage?.text ||
      m.messages[0]?.message?.conversation
    // console.log({ receivedMessage, senderNumber });

    if (receivedMessage) {
      let ultimaMensagemEnviada = null

      console.log('tem bot? ', receivedMessage.includes('*_[BOT]_*:'))

      if (!receivedMessage.includes('*_[BOT]_*:')) {
        if (receivedMessage === ultimaMensagemEnviada) {
          console.log('Mensagem repetida. Evitando spam.')
          return
        }

        ultimaMensagemEnviada = receivedMessage

        const matchedPair = qaPairs.find((pair) =>
          receivedMessage.includes(pair.message_person.toLowerCase()),
        )

        const number = '5521984254026'
        const numberzap = number + '@s.whatsapp.net'
        const messageReceived = 'Oi'
        const messageResponse = 'testando bot.'

        const responseMessage = findBestResponse(receivedMessage, qaPairs)
        // console.log("responseMessage: ", responseMessage);

        // if (senderNumber === numberzap && receivedMessage === messageReceived.toLowerCase()) {
        // if (senderNumber === numberzap && matchedPair) {
        //   // Responder ao número específico
        //   const responseMessage = matchedPair.message_bot;
        //   await sock.sendMessage(senderNumber, { text: responseMessage });
        // }
        // if (matchedPair) {
        //   // Responder ao número específico
        //   const responseMessage = "*[BOT]* : " + matchedPair.message_bot;
        //   await sock.sendMessage(senderNumber, { text: responseMessage });
        // }
        // const responseMessage = await getAutoShopAIResponse(receivedMessage)
        if (responseMessage) {
          const formattedResponse = '*_[BOT]_*: ' + responseMessage
          await sock.sendMessage(senderNumber, { text: formattedResponse })
        }
      }
    }
  })
}

connectionLogic()
