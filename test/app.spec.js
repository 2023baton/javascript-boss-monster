const BASE_URL = "../index.html";

const SELECTOR = {
  INPUT_SECTION: "#input-section",
  NAME_INPUT: "#name-input",
  BOSS_STATUS_INPUT: "#boss-status-input",
  PLAYER_STATUS_INPUT: "#player-status-input",
  START_RAID_BUTTON: "#start-raid-button",
  PLAYER_NAME: "#player-name",
  PLAYER_HP: "#player-hp",
  PLAYER_MP: "#player-mp",
  BOSS_HP: "#boss-hp",
  PHYSICAL_ATTACK: "#physical-attack",
  MAGIC_ATTACK: "#magic-attack",
};

// const RandomGenerator = {
//   random()
// }

// const addShuffleReturnCommand = () => {
//   Cypress.Commands.add("shuffleReturn", (returnValues = []) => {
//     cy.visit(BASE_URL, {
//       onBeforeLoad: (window) => {
//         window.MissionUtils = {
//           Random: {
//             shuffle: () => returnValues,
//           },
//         };
//       },
//     });
//   });
// };

/* 입력값 유효성 검사 */
// describe("입력 값에 대한 유효성 검사를 진행한다.", () => {
//   it("플레이어의 이름은 5자 이하여야 한다.", () => {
//     cy.visit(BASE_URL);

//     const alertStub = cy.stub();
//     cy.on("window:alert", alertStub);

//     const testCases = [" ", "도리토스트으"].forEach((playerName) => {
//       const bossStatus = "200";
//       const playerStatus = "100,100";

//       cy.get(SELECTOR.NAME_INPUT).clear().type(playerName);
//       cy.get(SELECTOR.BOSS_STATUS_INPUT).clear().type(bossStatus);
//       cy.get(SELECTOR.PLAYER_STATUS_INPUT).clear().type(playerStatus);

//       cy.get(SELECTOR.START_RAID_BUTTON)
//         .click()
//         .then(() => {
//           expect(alertStub).to.have.been.called;
//         });

//       cy.reload();
//     });
//   });

//   it("보스 몬스터 초기 HP는 100이상 300이하여야 한다.. ", () => {
//     cy.visit(BASE_URL);

//     const alertStub = cy.stub();

//     cy.on("window:alert", alertStub);

//     ["99", "301", " ", "10as"].forEach((bossStatus) => {
//       const playerName = "도리토스트";
//       const playerStatus = "100,100";

//       cy.get(SELECTOR.NAME_INPUT).type(playerName);
//       cy.get(SELECTOR.BOSS_STATUS_INPUT).type(bossStatus);
//       cy.get(SELECTOR.PLAYER_STATUS_INPUT).type(playerStatus);

//       cy.get(SELECTOR.START_RAID_BUTTON)
//         .click()
//         .then(() => {
//           expect(alertStub).to.have.been.called;
//         });

//       cy.reload();
//     });
//   });

//   it("플레이어의 초기 HP와 MP의 합은 200이어야 한다. ", () => {
//     cy.visit(BASE_URL);

//     const alertStub = cy.stub();

//     cy.on("window:alert", alertStub);

//     ["1,2", "-100,300", "0,200", "a,200"].forEach((playerStatus) => {
//       const playerName = "도리토스트";
//       const bossStatus = "150";

//       cy.get(SELECTOR.NAME_INPUT).type(playerName);
//       cy.get(SELECTOR.BOSS_STATUS_INPUT).type(bossStatus);
//       cy.get(SELECTOR.PLAYER_STATUS_INPUT).type(playerStatus);

//       cy.get(SELECTOR.START_RAID_BUTTON)
//         .click()
//         .then(() => {
//           expect(alertStub).to.have.been.called;
//         });

//       cy.reload();
//     });
//   });
// });

/* 레이드 성공 케이스(랜덤값 mocking) */
describe("보스의 HP가 0이 되면 플레이어가 승리한다.", () => {
  it("초기값을  입력한다.", () => {
    let randomValues = [1, 2, 3, 4, 5]; // 원하는 랜덤 값들을 배열로 지정
    let callCount = 0;

    cy.visit(BASE_URL, {
      onBeforeLoad: (window) => {
        window.random = {
          calculateBossDMG: () => 7,
        };
        console.log(window)
      },

      
    });


  before(() => {
    Cypress.Commands.add("stubRandomReturns", (returnValues = []) => {
      const randomStub = cy.stub();

      returnValues.forEach((value, index) => {
        randomStub.onCall(index).returns(value);
      });

      cy.visit(baseUrl, {
        onBeforeLoad: (window) => {
          window.MissionUtils = {
            Random: {
              pickNumberInRange: randomStub,
            },
          };
        },
      });
    });
  });

  beforeEach(() => {
    cy.stubRandomReturns([5, 1]);
  });



    const playerName = "도리토스";
    const bossStatus = "100";
    const playerStatus = "100,100";

    cy.get(SELECTOR.NAME_INPUT).clear().type(playerName);
    cy.get(SELECTOR.BOSS_STATUS_INPUT).clear().type(bossStatus);
    cy.get(SELECTOR.PLAYER_STATUS_INPUT).clear().type(playerStatus);
    cy.get(SELECTOR.START_RAID_BUTTON).click();

    cy.get(SELECTOR.PHYSICAL_ATTACK)
      .click()
      .then(() => {
        cy.get(SELECTOR.PLAYER_HP).contains("[99/100]");
        cy.get(SELECTOR.BOSS_HP).contains("[90/100]");
      });

    cy.get(SELECTOR.MAGIC_ATTACK)
      .click()
      .then(() => {
        cy.get(SELECTOR.PLAYER_HP).contains("[97/100]");
        cy.get(SELECTOR.PLAYER_MP).contains("[70/100]");
        cy.get(SELECTOR.BOSS_HP).contains("[70/100]");
      });
  });
});

/* 레이드 실패 케이스(랜덤값 mocking) */

//   it("프론트엔드 크루 1명을 추가할 수 있어야 한다.", () => {
//     cy.visit(BASE_URL);
//     // given
//     const crewName = "포비";

//     // when
//     cy.get(SELECTOR.CREW_TAB).click();
//     cy.get(SELECTOR.FRONTEND_COURSE_INPUT).check("frontend");
//     cy.get(SELECTOR.CREW_NAME_INPUT).type(crewName);
//     cy.get(SELECTOR.ADD_CREW_BUTTON).click();

//     // then
//     cy.get("table#crew-table td").contains(crewName).should("exist");
//   });

// it("프론트엔드 숫자야구게임 미션에서 팀을 매칭할 수 있어야 한다.", () => {
//   addShuffleReturnCommand();

//   // given
//   const crewNames = ["준", "포코", "공원", "로이드", "워니"];
//   cy.shuffleReturn([2, 4, 3, 0, 1]);

//   // when
//   // 프론트엔드 크루 5명 추가
//   cy.get(SELECTOR.CREW_TAB).click();
//   cy.get(SELECTOR.FRONTEND_COURSE_INPUT).check("frontend");
//   crewNames.forEach((name) => {
//     cy.get(SELECTOR.CREW_NAME_INPUT).type(name);
//     cy.get(SELECTOR.ADD_CREW_BUTTON).click();
//     cy.get(SELECTOR.CREW_NAME_INPUT).clear();
//   });

//   // 프론트엔드 숫자야구게임 2명씩 팀 매칭
//   cy.get(SELECTOR.TEAM_TAB).click();
//   cy.get(SELECTOR.COURSE_SELECT).select("frontend");
//   cy.get(SELECTOR.MISSION_SELECT).select("baseball");
//   cy.get(SELECTOR.SHOW_TEAM_MATCHER_BUTTON).click();
//   cy.get(SELECTOR.TEAM_MEMBER_COUNT_INPUT).type("2");
//   cy.get(SELECTOR.MATCH_TEAM_BUTTON).click();

//   // then
//   cy.get("ul#team-match-result li").eq(0).should("have.text", "공원,워니,포코");
//   cy.get("ul#team-match-result li").eq(1).should("have.text", "로이드,준");
// });
