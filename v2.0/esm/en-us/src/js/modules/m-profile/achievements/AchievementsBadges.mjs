function renderBadge(achievement_data) {
  const { badge, hierarchy } = achievement_data;

  if (badge === 'card_badge') {
    return `
    <div class="card-badge">
      <div class="card">
        <p>
          <img
            src="../src/assets/images/themes/adventure-time-theme/front-face.webp"
            alt="Card - Front Face"
          />
        </p>
      </div>
      <div class="card flipped">
        <p>
          <img
            src="../src/assets/images/themes/adventure-time-theme/easy/finn.png"
            alt="Flipped Card"
          />
        </p>
      </div>
    </div>
    `;
  }

  if (badge === 'crown_badge') {
    return `
    <div class="crown-badge">
      <div class="crown-badge__crown --${hierarchy}"></div>
      <div class="crown-badge__bottom-piece --${hierarchy}"></div>
    </div>
    `;
  }

  if (badge === 'win_streak_badge') {
    return `
    <div class="win-streak-badge">
      <img
        src="../src/assets/images/icons/${hierarchy}-trophy.png"
        alt="Trophy Icon"
      />
    </div>
    `;
  }
}

export { renderBadge };
