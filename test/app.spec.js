describe("구현 결과가 요구사항과 일치해야 한다.", () => {
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
    PHYSICAL_ATTACK: "#physical-attack",
    MAGIC_ATTACK: "#magic-attack",
  };

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

  it("레이드 정보를 입력 받는다.", () => {
    cy.visit(BASE_URL);
    // given
    const nameInput = "도리토스트";
    const bossStatus = "120";
    const playerStatus = "100,100";

    // when
    cy.get(SELECTOR.NAME_INPUT).type(nameInput);
    cy.get(SELECTOR.BOSS_STATUS_INPUT).type(bossStatus);
    cy.get(SELECTOR.PLAYER_STATUS_INPUT).type(playerStatus);

    cy.get(SELECTOR.START_RAID_BUTTON).click();

    //then
    cy.get(SELECTOR.NAME_INPUT).should("be.empty");
    cy.get(SELECTOR.BOSS_STATUS_INPUT).should("be.empty");
    cy.get(SELECTOR.PLAYER_STATUS_INPUT).should("be.empty");

    // then
    // cy.get(SELECTOR.ADD_CREW_BUTTON)
    //   .click()
    //   .then(() => {
    //     expect(alertStub).to.be.called;
    //   });
  });

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
});
