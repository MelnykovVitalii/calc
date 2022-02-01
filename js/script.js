const btn = document.getElementById('submit');
const radioButtons = [...document.querySelectorAll('input[type="radio"]')];
const resultBlock = document.querySelector('.result__block');

btn.addEventListener('click', function (e) {
  e.preventDefault();

  let first_N = document.getElementById('firstNumerator').value;
  let first_D = document.getElementById('firstDenominator').value;
  let second_N = document.getElementById('secondNumerator').value;
  let second_D = document.getElementById('secondDenominator').value;

  const radioBtnChecked = radioButtons.some((element) => element.checked);

  if (first_N && first_D && second_N && second_D && radioBtnChecked) {
    first_N = Number(first_N);
    first_D = Number(first_D);
    second_N = Number(second_N);
    second_D = Number(second_D);

    const resMultiplication = multiplication(
      first_N,
      first_D,
      second_N,
      second_D
    );
    if (resMultiplication.numerator && resMultiplication.denominator) {
      const defaultResult = 0;
      const result = reduction(
        resMultiplication.numerator,
        resMultiplication.denominator
      );
      console.log(result);
      // console.log('yes');
      resultBlock.innerHTML = `
      <p class="result__header">Ответ</p>
          <div class="result__wrapper">
            <div class="result__numerator">${result.numerator}</div>
            <hr class="line" />
            <div class="result__denumerator">${result.denominator}</div>
          </div>
      `;
    } else {
      resultBlock.innerHTML = `
      <p class="result__header">Ответ</p>
          <div class="result__wrapper">
            <div class="result__default">${defaultResult}</div>
          </div>
      `;
    }
    // const resultN = first_N * second_N;
    // const resultD = first_D * second_D;
    // let result = reduction(resultN, resultD);
    // console.log(result);
    // console.log(resultN, resultD);
    // console.log(reduction(resultN, resultD));

    // let operation = '';
    // radioButtons.forEach((el) => {
    //   if (el.checked) {
    //     return (operation = el.value);
    //   }
    // });
    // console.log(operation);
  } else {
    resultBlock.innerHTML = `
    <p class="result__header">Не все данные введены!</p>
    `;
  }
});

function reduction(numerator, denominator) {
  const a = numerator;
  const b = denominator;
  let NOD = 1;

  while (numerator != 0 && denominator != 0) {
    if (numerator > denominator) {
      numerator = numerator % denominator;
    } else {
      denominator = denominator % numerator;
    }
  }

  NOD = 1 * (numerator + denominator);

  return {
    numerator: a / NOD,
    denominator: b / NOD,
  };
}

function multiplication(firstN, firstD, secondN, secondD) {
  if ((firstN && firstD && secondN && secondD) !== 0) {
    return {
      numerator: firstN * secondN,
      denominator: firstD * secondD,
    };
  } else {
    return {
      numerator: 0,
      denominator: 0,
    };
  }
}
