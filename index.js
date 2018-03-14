const {Builder, By, Key, until, WebElement} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const firefox = require('selenium-webdriver/firefox');



(async function example() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        let nodeList = [];
        let titleList = [];
        await driver.get('-');
        await driver.findElement(By.id('user_id')).sendKeys('1234');
        await driver.findElement(By.id('user_pw')).sendKeys('1234');
        await driver.findElement(By.id('loginBtnAct')).click();
        await driver.wait(until.elementLocated(By.className('bbs_btn_area')))

        // nodeList = nodeList.concat(await driver.findElements(By.xpath('//div[@class="bbs_renewal_board3"]/ul/li')));

        for(var i = 1; i < 10; i++) {
            nodeList = await driver.findElements(By.xpath('//div[@class="bbs_renewal_board3"]/ul/li'));
            const titles = nodeList.map(each => {
                let title = '';
                title = each.getText();
                return title;
            })
            await Promise.all(titles); //일단 전부다 resolve되면 await 코드가 동기적으로 바뀐다.
            titles.forEach(async function (t) {
                const title = await t;
                if (title.includes('브라운')) {
                    console.log(title);
                }
            });

            const nextPage = await driver.findElement(By.xpath('//div[@class="paginate"]/a[@class="on"]/following::a'));
            // console.log(await nextPage.getText());
            console.log('clicking next page..');
            await nextPage.click();
            console.log('clicked.');
            await driver.wait(until.stalenessOf(nodeList[nodeList.length-1]));
            await driver.wait(until.stalenessOf(nodeList[0]));
            await driver.wait(until.elementLocated(By.xpath('//div[@class="bbs_renewal_board3"]/ul/li')));
            // driver.Alert();
            // await driver.actions().pause(5000);

        // console.log(nodeList.length);

    } catch(e) {
        console.log(e);
    } finally {
        // await driver.quit();
    }
})();
