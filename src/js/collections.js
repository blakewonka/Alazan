// Filter header toggle
const closedHeader = document.getElementById('filter-header-closed');
const openHeader   = document.getElementById('filter-header-open');

function openFilters() {
  if (!closedHeader || !openHeader) return;
  closedHeader.hidden = true;
  openHeader.hidden   = false;
}

function closeFilters() {
  if (!closedHeader || !openHeader) return;
  openHeader.hidden   = true;
  closedHeader.hidden = false;
}

document.getElementById('open-filters-btn')?.addEventListener('click', openFilters);
document.getElementById('open-filters-icon')?.addEventListener('click', openFilters);
document.getElementById('close-filters-btn')?.addEventListener('click', closeFilters);
document.getElementById('apply-filters-btn')?.addEventListener('click', closeFilters);
document.getElementById('cancel-filters-btn')?.addEventListener('click', closeFilters);

// Chip active-state toggle within each group
document.querySelectorAll('.filter-header__chips, .filter-header__section-chips').forEach(group => {
  group.addEventListener('click', e => {
    const chip = e.target.closest('.filter-chip');
    if (!chip) return;
    group.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('filter-chip--active'));
    chip.classList.add('filter-chip--active');
  });
});
