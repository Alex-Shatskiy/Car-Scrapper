const puppeteer = require("puppeteer")
require("dotenv").config()
const chromium = require("chromium")

async function autoWorld(url) {
  const browser = await puppeteer.launch({
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

  for (let i = 1; i < list.length + 1; i++) {
    await carData.push(await getPageData(page,i))
  }
  }else{
    let nextPage = await checkForNextPage(page)

    while (nextPage != undefined) {
      const list = await page.evaluate(() =>
        Array.from(document.querySelectorAll(".vehicle"))
      )
      for (let i = 1; i < list.length + 1; i++) {
        await carData.push(await getPageData(page, i))
      }
      nextPage = await checkForNextPage(page)
    
      if (nextPage != undefined) {
        await page.click(".btn-next")
      }

      await delay(400)
    }
  }
  browser.close()
  console.log(carData)
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

async function getPageData(page, iterate) {
  let imgUrl = await getImgUrl(
    page,
    `//*[@id="frmDefault"]/div[3]/div/div[2]/div[1]/div/div[2]/div/div[4]/ul/li[${iterate}]/div/div/div[1]/a/img`
  )
  let title = await getTxtContent(
    page,
    `//*[@id="frmDefault"]/div[3]/div/div[2]/div[1]/div/div[2]/div/div[4]/ul/li[${iterate}]/div/div/div[2]/div[1]/a/h6`
  )

  let km = await getTxtContent(
    page,
    `//*[@id="frmDefault"]/div[3]/div/div[2]/div[1]/div/div[2]/div/div[4]/ul/li[${iterate}]/div/div/div[2]/div[5]/div/text()`
  )

  km = km.replace(/\s+/g, " ").trim().split(",")

  let price = await getTxtContent(
    page,
    `//*[@id="frmDefault"]/div[3]/div/div[2]/div[1]/div/div[2]/div/div[4]/ul/li[${iterate}]/div/div/div[2]/span/span/span/span`
  )

  let pageUrl = await getPageUrl(
    page,
    `//*[@id="frmDefault"]/div[3]/div/div[2]/div[1]/div/div[2]/div/div[4]/ul/li[${iterate}]/div/div/div[1]/a`
  )

  return await({
    aw_carimage: imgUrl,
    aw_carname: title.replace(/\s+/g, " ").trim(),
    aw_price: price !=undefined?parseInt(price.replace(/\D/g, '')):null,
    aw_km: parseInt(km[0] + km[1]),
    aw_cc: km[4] !=undefined?parseInt( km[4].replace(/\D/g, '')):null,
    aw_type: km[3]!=undefined?km[3]:null,
    aw_transmission: km[2],
    aw_pageurl: pageUrl,
  })
  }




module.exports = {
  autoWorld,
}
