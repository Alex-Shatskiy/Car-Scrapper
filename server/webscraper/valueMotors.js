const pt = require("puppeteer")
async function valueMotors(url) {
  //launch browser in headless mode
  const browser = await pt.launch({ headless: true })
  //browser new page
  const page = await browser.newPage()
  let carData = []
  //launch URL
  await page.goto(url)
  //identify element with class name

  let getPageNumber = await checkPageNumbers(page)

  let noResults = await page.evaluate(() => {
    let pages = document.querySelector(".no-results-text p")
    return pages ? pages.innerText : null
  })
  if (noResults == null) {
    if (getPageNumber == null) {
      const list = await page.evaluate(() =>
        Array.from(document.querySelectorAll(".vehicle"))
      )

      for (let i = 1; i < list.length + 1; i++) {
        await carData.push(await getPageData(page, i))
      }
    } else {
      const [el] = await page.$x(
        `/html/body/form/div[3]/div/div[2]/div[1]/div/div[3]/div/div/div[2]/div/span/a[3]`
      )
      const pageNumber = await el.getProperty("textContent")
      const rawPageNumber = parseInt(await pageNumber.jsonValue())

      for (let i = 0; i < rawPageNumber; i++) {
        let pageSelector = await checkNextPage(page)
        //identify element with class name

        let list = await page.evaluate(() =>
          Array.from(document.querySelectorAll(".vehicle"))
        )
        await console.log(await list)
        for (let j = 1; j < (await list.length) + 1; j++) {
          await carData.push(await getPageData(page, j))
        }

        if (pageSelector != null) {
          await page.click(".btn-next")
        }
        await delay(1000)
      }
    }
  }

  // browser.close()
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

async function checkNextPage(page) {
  return await page.evaluate(() => {
    let pages = document.querySelector(".btn-next")
    console.log(pages)
    return pages ? pages.innerText : null
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
    `//*[@id="frmDefault"]/div[3]/div/div[2]/div[1]/div/div[2]/div/div[4]/ul/li[${iterate}]/div/div/div[2]/div[5]/div`
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

  return await {
    img: imgUrl,
    title: title.replace(/\s+/g, " ").trim(),
    price: price,
    km: km[0] + "," + km[1],
    cc: km[4],
    type: km[3],
    transmission: km[2],
    pageUrl: pageUrl,
  }
}

module.exports = {
  valueMotors,
}
