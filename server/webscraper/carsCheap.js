const puppeteer = require("puppeteer-core")
require("dotenv").config()

const chromium = require('chromium');

async function getText(url) {


  //launch browser in headless mode
  const browser = await puppeteer.launch({
    args: [
      "--disable-setuid-sandbox",
      "--no-sandbox",
      "--single-process",
      "--no-zygote",
    ],
    executablePath: chromium.path
  });
  //browser new page
  const page = await browser.newPage()
  //launch URL
  await page.goto(url)
  //identify element with class name
  const list = await page.evaluate(() =>
    Array.from(document.querySelectorAll(".vehicle"))
  )
  let carData = []

  for (let i = 1; i < list.length + 1; i++) {
    let imgUrl = await getImgUrl(
      page,
      `//*[@id="vehicle-list-results"]/li[${i}]/div[1]/div/div[1]/a/img`
    )
    let title = await getTxtContent(
      page,
      `//*[@id="vehicle-list-results"]/li[${i}]/div[1]/div/div[2]/h6/a`
    )
    let km = await getTxtContent(
      page,
      `//*[@id="vehicle-list-results"]/li[${i}]/div[1]/div/div[2]/ul/li[1]`
    )
    let cc = await getTxtContent(
      page,
      `//*[@id="vehicle-list-results"]/li[${i}]/div[1]/div/div[2]/ul/li[4]`
    )
    let transmission = await getTxtContent(
      page,
      `//*[@id="vehicle-list-results"]/li[${i}]/div[1]/div/div[2]/ul/li[3]`
    )
    let price = await getTxtContent(
      page,
      `//*[@id="vehicle-list-results"]/li[${i}]/div[1]/div/div[2]/div[1]/text()`
    )

    let type = await getTxtContent(
      page,
      `//*[@id="vehicle-list-results"]/li[${i}]/div[1]/div/div[2]/ul/li[2]`
    )

    let pageUrl = await getPageUrl(
      page,
      `//*[@id="vehicle-list-results"]/li[${i}]/div[1]/div/div[1]/a`
    )

    await carData.push({
      img: imgUrl,
      title: title,
      price: "$" + price.replace(/\D/g, ""),
      km: km,
      cc: type == "Electric" ? "N/A" : cc,
      type: type,
      transmission: transmission,
      pageUrl: pageUrl,
    })
  }

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
  getText,
}
