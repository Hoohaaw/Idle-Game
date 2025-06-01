document.addEventListener('DOMContentLoaded', () => {
  const totalAvailablePoints = 9;
  const numCharacters = 5;
  const maxPointsPerTalent = 5;
  const maxPointsPerRow = 5;

  const pointsLeftSpan = document.getElementById('points-left');
  const treesContainer = document.getElementById('talent-trees-container');

  const characters = Array.from({ length: numCharacters }, (_, index) => {
    const tree = createTalentTree(index);
    treesContainer.appendChild(tree);
    return {
      tree,
      spentPoints: 0,
    };
  });

  let currentCharacterIndex = 0;
  characters[currentCharacterIndex].tree.classList.add('active');
  updatePointsCounter();

  document.querySelectorAll('#character-buttons button').forEach(btn => {
    btn.addEventListener('click', () => {
      const newIndex = parseInt(btn.dataset.character);
      if (newIndex !== currentCharacterIndex) {
        characters[currentCharacterIndex].tree.classList.remove('active');
        currentCharacterIndex = newIndex;
        characters[currentCharacterIndex].tree.classList.add('active');
        updatePointsCounter();
      }
    });
  });

  document.getElementById('reset-button').addEventListener('click', () => {
    const char = characters[currentCharacterIndex];
    char.spentPoints = 0;
    const rows = char.tree.querySelectorAll('.row');
    rows.forEach((row, rowIndex) => {
      const talents = row.querySelectorAll('.talent');
      talents.forEach(t => {
        t.setAttribute('data-points', '0');
        t.classList.remove('locked-talent');
      });
      if (rowIndex === 0) {
        row.classList.add('unlocked');
        row.classList.remove('locked');
      } else {
        row.classList.add('locked');
        row.classList.remove('unlocked');
      }
    });
    updatePointsCounter();
  });

  function updatePointsCounter() {
    const char = characters[currentCharacterIndex];
    const allTalents = char.tree.querySelectorAll('.talent');
    const total = [...allTalents].reduce((sum, t) => sum + parseInt(t.getAttribute('data-points')), 0);
    char.spentPoints = total;
    pointsLeftSpan.textContent = totalAvailablePoints - total;
  }

  function updateRowLockState(tree, row, rowIndex) {
    const talents = row.querySelectorAll('.talent');
    const totalPointsInRow = [...talents]
      .map(t => parseInt(t.getAttribute('data-points')))
      .reduce((a, b) => a + b, 0);

    talents.forEach(talent => {
      if (totalPointsInRow >= maxPointsPerRow) {
        talent.classList.add('locked-talent');
      } else {
        talent.classList.remove('locked-talent');
      }
    });

    if (totalPointsInRow >= maxPointsPerRow && rowIndex + 1 < tree.children.length) {
      const nextRow = tree.children[rowIndex + 1];
      nextRow.classList.remove('locked');
      nextRow.classList.add('unlocked');
    }
  }

  function createTalentTree() {
    const tree = document.createElement('div');
    tree.className = 'talent-tree';

    for (let r = 0; r < 6; r++) {
      const row = document.createElement('div');
      row.className = r === 0 ? 'row unlocked' : 'row locked';

      for (let t = 0; t < 3; t++) {
        const talent = document.createElement('div');
        talent.className = 'talent';
        talent.setAttribute('data-points', '0');
        talent.textContent = '0';

        talent.addEventListener('click', e => {
          const isShift = e.shiftKey;
          const char = characters[currentCharacterIndex];
          const totalPointsInRow = [...row.querySelectorAll('.talent')]
            .map(t => parseInt(t.getAttribute('data-points')))
            .reduce((a, b) => a + b, 0);

          let points = parseInt(talent.getAttribute('data-points'));

          if (isShift && points > 0) {
            points--;
          } else if (
            !isShift &&
            points < maxPointsPerTalent &&
            totalPointsInRow < maxPointsPerRow &&
            char.spentPoints < totalAvailablePoints
          ) {
            points++;
          }

          talent.setAttribute('data-points', points);
          talent.textContent = points;
          updateRowLockState(tree, row, r);
          updatePointsCounter();
        });

        row.appendChild(talent);
      }

      tree.appendChild(row);
    }

    return tree;
  }
});
