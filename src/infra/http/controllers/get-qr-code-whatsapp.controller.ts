import { Controller, Post } from '@nestjs/common'
import {
  useMultiFileAuthState,
  makeWASocket,
  DisconnectReason,
} from '@whiskeysockets/baileys'

import { qaPairs } from '@/codeBotzapBackup/baseDados'
import { findBestResponse } from '@/codeBotzapBackup/learnAnswer'

@Controller('whatsapp')
export class GetQrCodeWhatsappController {
  // constructor() {}

  @Post('connect')
  async connect(): Promise<any> {
    const { state, saveCreds } =
      await useMultiFileAuthState('auth_info_baileys')
    const sock = makeWASocket({
      auth: state,
      printQRInTerminal: true,
    })

    sock.ev.on('connection.update', (update: any) => {
      const { connection, lastDisconnect, qr } = update || {}

      if (qr) {
        console.log(qr) // Exibir QR code no terminal
      }

      if (connection === 'close') {
        const shouldReconnect =
          lastDisconnect?.error?.output?.statusCode !==
          DisconnectReason.loggedOut

        console.log(
          'connection closed due to ',
          lastDisconnect.error,
          ', reconnecting ',
          shouldReconnect,
        )

        if (shouldReconnect) {
          this.connect() // Rechamar a função de conexão
        }
      } else if (connection === 'open') {
        console.log('opened connection')
      }
    })

    sock.ev.on('creds.update', saveCreds)

    sock.ev.on('messages.upsert', async (m: any) => {
      const senderNumber = m.messages[0]?.key.remoteJid
      const receivedMessage =
        m.messages[0]?.message?.extendedTextMessage?.text ||
        m.messages[0]?.message?.conversation

      if (receivedMessage) {
        let ultimaMensagemEnviada: string | null = null

        console.log('tem bot? ', receivedMessage.includes('*_[BOT]_*:'))

        if (!receivedMessage.includes('*_[BOT]_*:')) {
          if (receivedMessage === ultimaMensagemEnviada) {
            console.log('Mensagem repetida. Evitando spam.')
            return
          }

          ultimaMensagemEnviada = receivedMessage

          const matchedPair = qaPairs.find((pair: any) =>
            receivedMessage.includes(pair.message_person.toLowerCase()),
          )

          const number = '5521984254026'
          const numberzap = number + '@s.whatsapp.net'
          const messageReceived = 'Oi'
          const messageResponse = 'testando bot.'

          const responseMessage = findBestResponse(receivedMessage, qaPairs)

          if (responseMessage) {
            const formattedResponse = '*_[BOT]_*: ' + responseMessage
            await sock.sendMessage(senderNumber, { text: formattedResponse })
          }
        }
      }
    })

    return { message: 'Connected to WhatsApp' } // Retorno da requisição
  }
}
