function drawWorldMap() {

  var AMERICAS = ["US", "CA", "MX"],
    	EMEA = ["FR", "ES", "PT", "GB", "DE", "CH", "MD", "ME", "BE", "NO", "SE", "FI", "PL", "DK", "EE", "LV", "LT", "BY", "NL", "IE", "UA", "RO", "BG", "GR", "HU", "SK", "CZ", "AT", "SI", "IT", "RS", "BA", "HR", "XK", "AL", "MK"],
    	APAC = ["RU", "CN", "IN", "AU", "NZ", "BD", "MM", "TH", "KH", "LK", "JP", "VN", "ID", "MY", "LA", "NP", "BT", "PH", "TW", "PG", "KP", "KR", "PK", "KG", "TJ", "AF"],
    	countries = {};

  var americasTrend = americasProfit / 20,
		emeaTrend = emeaProfit / 20,
		apacTrend = apacProfit / 20;

	AMERICAS.forEach(function(country) {
		countries[country] = americasTrend;
	});
	EMEA.forEach(function(country) {
		countries[country] = emeaTrend;
	});
	APAC.forEach(function(country) {
		countries[country] = apacTrend;
	});
	console.log('AMER = ' + americasTrend +' EMEA = '+ emeaTrend +' APAC = '+ apacTrend);

  $('#jVectorMap').empty();
  
  $('#jVectorMap').vectorMap({
    map: 'world_mill_en',
    zoomOnScroll: false,
    zoomButtons: false,
    bindTouchEvents: false,
    regionsSelectable: false,
    onRegionLabelShow: null,
    backgroundColor: 'white',
    regionStyle: {
      initial: {
        fill: '#ddd'
      },
      hover: null
    },
    series: {
      regions: [{
        scale: ['#dc6f44','#dfb200','#88c96c'],
        min: 0,
        max: 2.5,
        normalizeFunction: 'linear',
        values: countries
      }]
    }
  });

}

function createFlagShip(revenue, profit, region) {
  var SHIP_WIDTH = parseInt($('.flagShip').css('width'), 10) - 20,
    SHIP_HEIGHT = parseInt($('.flagShip').css('height'), 10),
    outerDiameter = SHIP_WIDTH * revenue / TOTAL_REVENUE,
    innerDiameter = outerDiameter * profit / 100,
    topFlagHeight = (SHIP_HEIGHT - outerDiameter) / 2,
    bottomFlagHeight = topFlagHeight,
    bottomFlagStickHeight = (outerDiameter - innerDiameter) / 2,
    bottomFlagSticktop = (outerDiameter - innerDiameter) / 2,
    id = '#flagShip' + region;

    $(id + ' .topFlag').css({'height': topFlagHeight + 'px'});
    $(id + ' .bottomFlag').css({'height': bottomFlagHeight + 'px'});
    $(id + ' .outerCircle').css({'height': outerDiameter + 'px', 'width': outerDiameter + 'px', 'border-radius': outerDiameter + 'px'});
    $(id + ' .innerCircle').css({'height': innerDiameter + 'px', 'width': innerDiameter + 'px', 'border-radius': innerDiameter + 'px', 'top': bottomFlagStickHeight + 'px'});
    $(id + ' .bottomFlagStick').css({'height': bottomFlagStickHeight + 'px', 'top': bottomFlagSticktop + 'px'});
    $(id + ' .bottomFlag .flag').css({'top': bottomFlagHeight - 18 + 'px'});
    $(id + ' .topFlag .flag').html(parseInt(revenue, 10) + ' M');
    $(id + ' .bottomFlag .flag').html(parseInt(profit , 10) + ' %');
}
