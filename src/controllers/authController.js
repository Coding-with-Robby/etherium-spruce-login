const { generateNonce, SiweMessage, ErrorTypes } = require('siwe')

async function Nonce(req, res) {
  req.session.nonce = generateNonce()
  res.setHeader('Content-Type', 'text/plain')
  res.status(200).send(req.session.nonce)
}

async function Verify(req, res) {
  try {
    if (!req.body.message) {
      res.status(422).json({ message: 'Expected prepareMessage object as body.' })
      return
    }

    let message = new SiweMessage(req.body.message)
    const fields = await message.validate(req.body.signature)
    if (fields.nonce !== req.session.nonce) {
      console.log(req.session)
      res.status(422).json({
        message: `Invalid nonce.`,
      })
      return
    }
    req.session.siwe = fields
    req.session.cookie.expires = new Date(fields.expirationTime)
    req.session.save(() => res.status(200).end())
  } catch (e) {
    req.session.siwe = null
    req.session.nonce = null
    console.error(e)
    switch (e) {
      case ErrorTypes.EXPIRED_MESSAGE: {
        req.session.save(() => res.status(440).json({ message: e.message }))
        break
      }
      case ErrorTypes.INVALID_SIGNATURE: {
        req.session.save(() => res.status(422).json({ message: e.message }))
        break
      }
      default: {
        req.session.save(() => res.status(500).json({ message: e.message }))
        break
      }
    }
  }
}

function Validate(req, res) {
  res.json({ address: req.session.siwe.address })
}

module.exports = {
  Nonce,
  Verify,
  Validate,
}
