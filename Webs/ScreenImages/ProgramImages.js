const delay = ms => new Promise(res => setTimeout(res, ms));

const REFRESH_PER_SECONDS = 30;

const Background = Array.from(document.querySelectorAll('body, html'));

function FromDateToUTC(minutes, hours, day, month, year) {
  return Date.UTC(year, month - 1, day, hours, minutes);
}

function PrintDate(prefix, minutes, hours, day, month, year) {
  console.log(prefix, hours, ':', minutes, ' ... ', day, '/', month, '/', year)
}

function GetCurrentImage() {
  var currentdate = new Date();
  
  const day = currentdate.getDate();
  const month = currentdate.getMonth() + 1;
  const year = currentdate.getFullYear();
  
  const hours = (currentdate.getHours() + 2) % 24;
  const minutes = currentdate.getMinutes();

  let leastDifference = -Infinity;
  let imageURL = '';
  
  programedImages.forEach(element => {
    const fixedDate = element.date.split('/');
    const fixedDay = parseInt(fixedDate[0], 0xA);
    const fixedMonth = parseInt(fixedDate[1], 0xA);
    const fixedYear = parseInt(fixedDate[2], 0xA);
  
    const fixedTime = element.hour.split(':');
    const fixedHour = parseInt(fixedTime[0], 0xA);
    const fixedMinutes = parseInt(fixedTime[1], 0xA);

    const fixedTimeNumber = FromDateToUTC(fixedMinutes, fixedHour, fixedDay, fixedMonth, fixedYear);
    const currentTimeNumber = FromDateToUTC(minutes, hours, day, month, year);
  
    const difference = fixedTimeNumber - currentTimeNumber;

    PrintDate('Fixed time: ', fixedMinutes, fixedHour, fixedDay, fixedMonth, fixedYear);
    PrintDate('Current time: ', minutes, hours, day, month, year);
    console.log('\n');

    if (leastDifference < difference && difference <= 0) {
      leastDifference = difference;
      imageURL = element.image;
    }
    
  });

  return imageURL;
}

async function UpdatingRepeatly() {
  let url = GetCurrentImage();
  
  if (url != '') {
    Background.forEach(element => {
      element.style.backgroundImage = `url(${url})` 
    })
  }

  await delay(REFRESH_PER_SECONDS * 1e3);
  UpdatingRepeatly();
}
UpdatingRepeatly();