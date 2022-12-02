import puppeteer from 'puppeteer'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const scrapePlayers = async () => {
  try {
    const teams = await prisma.team.findMany()
    const browser = await puppeteer.launch({
      headless: true,
      // executablePath: '/opt/homebrew/bin/chromium',
    })
    const page = await browser.newPage()
    for (const team of teams) {
      if (team.name.length <= 3) continue
      await page.goto(`https://www.fifa.com/fifaplus/en/tournaments/mens/worldcup/qatar2022/teams/${team.name.toLowerCase().replace(' ', '-')}/squad`)
      await page.waitForSelector('.player-badge-card_badgeCard__2DJ4B')

      const players = await page.evaluate(() => {
        // @ts-ignore
        const capitalizeFirstLetter = (string) => {
          if (!string) return null
          return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
        }
        // @ts-ignore
        const players = []
        const nodes = document.querySelectorAll('.player-badge-card_badgeCard__2DJ4B')

        nodes.forEach((node) => {
          console.log(node)
          // @ts-ignore
          const firstName = node.querySelector('.player-badge-card_playerFirstname__1HlN6').querySelector('span').textContent

          // @ts-ignore
          const hasLastName = node.querySelector('.player-badge-card_playerSurname__3_5gf').querySelector('span')
          const lastName = hasLastName ? hasLastName.textContent : null

          // @ts-ignore
          const position = node.querySelector('.player-badge-card_playerPosition__wjnoI').querySelector('span').textContent

          // @ts-ignore
          const imageStyle = node.querySelector('.player-badge-card_playerImage__301X0').style.backgroundImage
          const imageUri = imageStyle.replace(/(url\(|\)|")/g, '')

          players.push({
            firstName: capitalizeFirstLetter(firstName),
            lastName: capitalizeFirstLetter(lastName),
            // @ts-ignore
            position: position.toUpperCase(),
            imageUri,
          })
        })

        // @ts-ignore
        return players
      })

      await prisma.player.createMany({
        data: players.map((player) => ({
          ...player,
          teamId: team.id,
        })),
      })
    }

    await browser.close()
  } catch
    (e) {
    console.error(e)
  }
}

export default scrapePlayers