const puppeteer = require("puppeteer")
require("dotenv").config()
const chromium = require("chromium")
const {
  getWholeSaleCarsPageData,
  getValueMotrosPageData,
  getCoventryCarsPageData,
  getCheapCarsPageData,
  getAutoWorldPageData,
} = require("./pageDataFunctions")

let carPages = [
  {
    url: "https://www.coventrycars.co.nz/vehicles?",
    dbType: "conventrycars",
  },
  {
    url: "https://www.autoworld.co.nz/vehicles",
    dbType: "autoworld",
  },
  {
    url: "https://www.wholesalecarsdirect.co.nz/vehicles",
    dbType: "wholesalecars",
  },
  {
    url: "https://www.valuemotors.co.nz/vehicles?",
    dbType: "valuemotors",
  },
  {
    url: "https://www.2cheapcars.co.nz/used-vehicles?Dealership=Wellington",
    dbType: "cheapcars",
  },
]

async function masterScrapper(url, dbType) {
  const browser = await puppeteer.launch({
    // headless: false,
    // args: [
    //   "--disable-setuid-sandbox",
    //   "--no-sandbox",
    //   "--single-process",
    //   "--no-zygote",
    // ],
    // executablePath: chromium.path,
  })

  //browser new page
  const page = await browser.newPage()
  let carData = []

  //launch URL
  await page.goto(url, { timeout: 0 })
  //identify element with class name
  let getPageNumber = await checkPageNumbers(page)
  await delay(10000)
  let banner = checkForBanner(page)

  if (banner == undefined) await page.click(".not-interested")

  if (getPageNumber == null) {
    const list = await page.evaluate(() =>
      Array.from(document.querySelectorAll(".vehicle"))
    )

    for (let i = 1; i < list.length + 1; i++) {
      await carData.push(await webSiteChecker(page, i, dbType))
    }
  } else {
    let nextPage = await checkForNextPage(page)

    while (nextPage != undefined) {
      const list = await page.evaluate(() =>
        Array.from(document.querySelectorAll(".vehicle"))
      )
      for (let i = 1; i < list.length + 1; i++) {
        await carData.push(await webSiteChecker(page, i, dbType))
      }

      nextPage = await checkForNextPage(page)

      if (nextPage != undefined) {
        await page.click(".btn-next")

        await delay(600)
      }
    }
  }
  browser.close()
  console.log(carData)
  return await carData
}
async function checkPageNumbers(page) {
  return await page.evaluate(() => {
    let pages = document.querySelector(".btn-current")
    return pages ? pages.innerText : null
  })
}
async function checkForNextPage(page) {
  return await page.evaluate(() => {
    let nextButton = Array.from(
      document.querySelectorAll(".btn-next[href]"),
      (a) => a.getAttribute("href")
    )
    return nextButton[0]
  })
}
async function checkForBanner(page) {
  return await page.evaluate(() => {
    let banner = Array.from(document.querySelector(".reveal-overlay"), (a) => {
      a.getAttribute(".not-interested")
    })
    return banner[0]
  })
}

function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time)
  })
}

async function webSiteChecker(page, i, dbType) {
  switch (dbType) {
    case "conventrycars":
      return await getCoventryCarsPageData(page, i)
      break
    case "autoworld":
      return await getAutoWorldPageData(page, i)
      break
    case "wholesalecars":
      return await getWholeSaleCarsPageData(page, i)
      break
    case "valuemotors":
      return await getValueMotrosPageData(page, i)
      break
    case "cheapcars":
      return await getCheapCarsPageData(page, i)
      break
    default:
      console.log("Ohh oooo")
  }
}

carPages.map(async (page) => await masterScrapper(page.url, page.dbType))
