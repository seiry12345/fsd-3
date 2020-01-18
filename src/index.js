// scafolding
import './assets/scss/main.scss';

// common scripts
import './assets/js/common';

import './components/srs-range/srs-range';

$('.range-slider').range({
	range: false,
	step: 20,
	to: 400,
});