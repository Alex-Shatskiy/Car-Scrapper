const puppeteer = require("puppeteer")
require("dotenv").config()
const chromium = require("chromium")
const { getWholeSaleCarsPageData, getValueMotrosPageData, getCoventryCarsPageData, getCheapCarsPageData, getAutoWorldPageData } = require('./pageDataFunctions')

async function masterScrapper(url, dbType) {
  const browser = await puppeteer.launch({
    headless: true
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

  if (getPageNumber == null) {

    const list = await page.evaluate(() =>
      Array.from(document.querySelectorAll(".vehicle"))
    )

    for (let i = 1; i < list.length; i++) {
      await carData.push(await webSiteChecker(page, i))
    }
  } else {
    let nextPage = await checkForNextPage(page)

    while (nextPage != undefined) {

      const list = await page.evaluate(() =>
        Array.from(document.querySelectorAll(".vehicle"))
      )
      for (let i = 1; i < list.length; i++) {

        await carData.push(await webSiteChecker(page, i))
      }

      nextPage = await checkForNextPage(page)

      if (nextPage != undefined) {
        await page.click(".btn-next")

        await delay(600)
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

  function delay(time) {
    return new Promise(function (resolve) {
      setTimeout(resolve, time)
    })
  }

  async function webSiteChecker(page, i) {
    switch (dbType) {
      case ("conventrycars"):
        return await getCoventryCarsPageData(page, i);
        break
      case "autoworld":
        return await getAutoWorldPageData("https://www.autoworld.co.nz/vehicles")
        break
      default:
        console.log("Ohh oooo")
    }
  }
}


masterScrapper("https://www.coventrycars.co.nz/vehicles?", "conventrycars")


module.exports = {

}
