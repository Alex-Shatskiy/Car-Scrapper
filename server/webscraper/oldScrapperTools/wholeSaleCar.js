const puppeteer = require("puppeteer")
require("dotenv").config()
const chromium = require("chromium")

async function wholeSale(url) {
  //launch browser in headless mode
  const browser = await puppeteer.launch({
    args: [
      "--disable-setuid-sandbox",
      "--no-sandbox",
      "--single-process",
      "--no-zygote",
    ],
    executablePath: chromium.path,
  })
  //browser new page
  const page = await browser.newPage()
  //launch URL
  await page.goto(url, { timeout: 0 })
  //identify element with class name
  const list = await page.evaluate(() =>
    Array.from(document.querySelectorAll(".vehicle"))
  )
  let carData = []

  for (let i = 1; i < list.length + 1; i++) {
    let imgUrl = await getImgUrl(
      page,
      `//*[@id="frmDefault"]/div[3]/div/div[2]/div[2]/div/div[2]/div[3]/ul/li[${i}]/div/div[1]/div[3]/div/div/div[2]/div/a/img`
    )
    let title = await getTxtContent(
      page,
      `//*[@id="frmDefault"]/div[3]/div/div[2]/div[2]/div/div[2]/div[3]/ul/li[${i}]/div/div[2]/div[1]/a[2]`
    )

    let km = await getTxtContent(
      page,
      `//*[@id="frmDefault"]/div[3]/div/div[2]/div[2]/div/div[2]/div[3]/ul/li[${i}]/div/div[2]/div[3]/div/text()`
    )

    km = await km.replace(/\s+/g, " ").trim().split(",")

    let price = await getTxtContent(
      page,
      `//*[@id="frmDefault"]/div[3]/div/div[2]/div[2]/div/div[2]/div[3]/ul/li[${i}]/div/div[2]/span/span/span/span`
    )
    let pageUrl = await getPageUrl(
      page,
      `//*[@id="frmDefault"]/div[3]/div/div[2]/div[2]/div/div[2]/div[3]/ul/li[${i}]/div/div[1]/div[3]/div/div/div[2]/div/a`
    )

    await carData.push({
      img: imgUrl,
      title: title.replace(/\s+/g, " ").trim(),
      price: price,
      km: km[0] + "," + km[1],
      cc: km[4],
      type: km[3],
      transmission: km[2],
      pageUrl: pageUrl,
    })
  }

  await console.log(carData)
  browser.close()
  return await carData
}

async function getTxtContent(page, xpath) {
  const [el1] = await page.$x(xpath)
  const title = await el1.getProperty("textContent")
  const rawTitle = await title.jsonValue()
  return await rawTitle
}

async function getImgUrl(page, xpath) {
  const [el] = await page.$x(xpath)
  const src = await el.getProperty("src")
  const srcTxt = await src.jsonValue()
  return await srcTxt
}

async function getPageUrl(page, xpath) {
  const [el] = await page.$x(xpath)
  const src = await el.getProperty("href")
  const srcTxt = await src.jsonValue()
  return await srcTxt
}

module.exports = {
  wholeSale,
}
