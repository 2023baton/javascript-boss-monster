const random = require("./random");

const $nameInput = document.querySelector("#name-input");
const $bossStatusInput = document.querySelector("#boss-status-input");
const $playerStatusInput = document.querySelector("#player-status-input");
const $bossShape = document.querySelector("#boss-shape");
const $playerName = document.querySelector("#player-name");
const $playerHP = document.querySelector("#player-hp");
const $playerMP = document.querySelector("#player-mp");
const $physicalAttack = document.querySelector("#physical-attack");
const $magicAttack = document.querySelector("#magic-attack");
const $bossHP = document.querySelector("#boss-hp");
const $gameSection = document.querySelector(".game-section");

document.querySelector("#start-raid-button").addEventListener("click", (event) => {
  event.preventDefault();

  if (
    $nameInput.value.trim() === "" ||
    $bossStatusInput.value.trim() === "" ||
    $playerStatusInput.value.trim() === ""
  ) {
    return alert("모든 입력값을 입력해주세요.");
  }

  const playerNameLength = $nameInput.value.length;
  if (playerNameLength > 5 || playerNameLength === 0) {
    return alert("이름은 1자 이상 5자 이하로 입력해주새요");
  }

  const bossStatus = parseInt($bossStatusInput.value, 10);

  if (isNaN($bossStatusInput.value)) {
    return alert("입력 값은 숫자 형태로 입력해주세요");
  }

  if (bossStatus < 100 || bossStatus > 300) {
    return alert("보스의 HP는 100 이상 300 이하여야 합니다.");
  }

  const playerStatus = $playerStatusInput.value.split(",");
  if (playerStatus.length !== 2) {
    return alert("플레이어의 HP와 MP는 ,로 구분하여 입력해주세요 ex) 120,80");
  }

  if (playerStatus[0] < 0 || playerStatus[1] < 0) {
    return alert("HP는 0이상이어야 합니다.");
  }

  if (isNaN(playerStatus[0]) || isNaN(playerStatus[1])) {
    return alert("입력 값은 숫자 형태로 입력해주세요");
  }

  if (parseInt(playerStatus[0], 10) + parseInt(playerStatus[1], 10) !== 200) {
    return alert("HP와 MP의 합은 200이어야 합니다.");
  }

  setStatus();

  $gameSection.classList.remove("hide");
});

const gameState = { turn: 0, isFinished: false };
const player = { name: "", HP: 0, MP: 0, maxHP: 0, maxMP: 0 }; //lol master 짬빱
const boss = { name: "익명의 드래곤", HP: 0, maxHP: 0 };

// 레이드 시작 버튼

const setStatus = () => {
  const playerName = $nameInput.value;
  player.name = playerName;

  const bossStatus = $bossStatusInput.value;
  boss.HP = parseInt(bossStatus, 10);
  boss.maxHP = boss.HP;

  const playerStatus = $playerStatusInput.value.split(",");
  player.HP = parseInt(playerStatus[0], 10);
  player.MP = parseInt(playerStatus[1], 10);
  player.maxHP = parseInt(playerStatus[0], 10);
  player.maxMP = parseInt(playerStatus[1], 10);

  $playerName.innerHTML = player.name;
  $bossHP.innerHTML = `❤️ [${boss.HP}/${boss.maxHP}]`;
  $playerHP.innerHTML = `❤️ [${player.HP}/${player.maxHP}]`;
  $playerMP.innerHTML = `💙 [${player.MP}/${player.maxMP}]`;

  $bossShape.innerHTML = `
                       ^-^ 
                     / 0 0 \\ 
                    (   "   ) 
                     \\  -  / 
                      - ^ - `;
};

// 물리 공격 버튼
const physicalAttack = () => {
  const PHYSICAL_DAMAGE = 10;
  const RECOVER_MP = 10;

  boss.HP -= PHYSICAL_DAMAGE;

  if (boss.HP <= 0) {
    gameState.isFinished = true;
    $bossHP.innerHTML = 0;

    $bossShape.innerHTML = `${player.name}님이 ${gameState.turn}번의 전투 끝에 보스 몬스터를 잡았습니다.
  `;
    return;
  }

  player.MP += RECOVER_MP;

  if (player.MP > player.maxMP) {
    player.MP = player.maxMP;
  }

  $bossHP.innerHTML = `❤️ [${boss.HP}/${boss.maxHP}]`;
  $playerHP.innerHTML = `❤️ [${player.HP}/${player.maxHP}]`;
  $playerMP.innerHTML = `💙 [${player.MP}/${player.maxMP}]`;
  $bossShape.innerHTML = `
                       ^-^
                     / x x \\
                    (   "\\  )
                     \\  -  /
                      - ^ -`;

  alert(`${boss.name}에게 ${PHYSICAL_DAMAGE}의 데미지를 입혔습니다!`);
};

// 마법 공격 버튼
const magicAttack = () => {
  const MAGICAL_DAMAGE = 20;
  const REQUIRED_MP = 30;

  if (player.MP < REQUIRED_MP) {
    alert("MP가 부족합니다!");
    return false;
  }

  player.MP -= REQUIRED_MP;
  boss.HP -= MAGICAL_DAMAGE;

  if (boss.HP <= 0) {
    gameState.isFinished = true;
    $bossHP.innerHTML = 0;

    $bossShape.innerHTML = `${player.name}님이 ${gameState.turn}번의 전투 끝에 보스 몬스터를 잡았습니다.
  `;
    return;
  }

  alert(
    `${REQUIRED_MP}의 마나를 소모하여 ${boss.name}에게 ${MAGICAL_DAMAGE}의 데미지를 입혔습니다!`
  );

  $bossHP.innerHTML = `❤️ [${boss.HP}/${boss.maxHP}]`;
  $playerHP.innerHTML = `❤️ [${player.HP}/${player.maxHP}]`;
  $playerMP.innerHTML = `💙 [${player.MP}/${player.maxMP}]`;
  $bossShape.innerHTML = `
                       ^-^
                     / x x \\
                    (   "\\  )
                     \\  -  /
                      - ^ -`;

  return true;
};

const bossTurn = () => {
  const BOSS_DAMAGE = random.calculateBossDMG();
  player.HP -= BOSS_DAMAGE;
  $playerHP.innerHTML = `❤️ [${player.HP}/${player.maxHP}]`;

  alert(`${boss.name}에게 ${BOSS_DAMAGE}의 데미지를 입었습니다!`);

  if (player.HP <= 0) {
    gameState.isFinished = true;
    $playerHP.innerHTML = 0;

    $bossShape.innerHTML = `
                       ^-^
                     / ^ ^ \\
                    (   "   )
                     \\  3  /
                      - ^ -
                    
    ${player.name}의 HP가 0이 되었습니다.
  보스 레이드에 실패했습니다. 턴: ${gameState.turn}
      `;
  }
};

document.querySelector("#physical-attack").addEventListener("click", () => {
  physicalAttack();

  if (gameState.isFinished) return;

  bossTurn();

  gameState.turn += 1;
});

document.querySelector("#magic-attack").addEventListener("click", () => {
  if (!magicAttack()) return;

  if (gameState.isFinished) return;

  bossTurn();

  gameState.turn += 1;
});
