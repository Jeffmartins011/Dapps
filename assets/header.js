var scrollFunctionForDiv = function(element, maxScroll, scrollAmount, scrollVelocity, direction){
	setTimeout(function(){
		if(direction=='left'){
			if(scrollAmount>-(maxScroll+scrollVelocity)){
				scrollAmount=scrollAmount-scrollVelocity;
				element.style.marginLeft = scrollAmount+"px";
				scrollFunctionForDiv(element, maxScroll, scrollAmount,scrollVelocity,direction);
			}else{
				scrollAmount=scrollAmount+scrollVelocity;
				element.style.marginLeft = scrollAmount+"px";
				scrollFunctionForDiv(element, maxScroll, scrollAmount,scrollVelocity,'right');
			}
		}
		if(direction=='right'){
			if(scrollAmount<scrollVelocity){
				scrollAmount=scrollAmount+scrollVelocity;
				element.style.marginLeft = scrollAmount+"px";
				scrollFunctionForDiv(element, maxScroll, scrollAmount,scrollVelocity,direction);
			}else{
				scrollAmount=scrollAmount-scrollVelocity;
				element.style.marginLeft = scrollAmount+"px";
				scrollFunctionForDiv(element, maxScroll, scrollAmount,scrollVelocity,'left');
			}
		}
	},1000);
}
var scrollIfNeeded = function (element) {
	var scrollVelocity = 40;
	var totalWidth = element.offsetWidth;
	var scrollWidth = element.scrollWidth;
	var maxScroll = scrollWidth - totalWidth;
	if(maxScroll>0){
		scrollFunctionForDiv(element, maxScroll, scrollVelocity, scrollVelocity,'left');
	}
}

function cccCreateCSSSelector (selector, styleRules) {
	var style = document.createElement('style');
    style.type = 'text/css';
    document.getElementsByTagName('head')[0].appendChild(style);
    if(!(style.sheet||{}).insertRule){
        (style.styleSheet || style.sheet).addRule(selector, styleRules);
    }else{
        style.sheet.insertRule(selector+"{"+styleRules+"}",0);
    }
}

function cccRefreshHeaderV3DataHeader () {
	var url = 'https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH,BNB,XRP,MATIC,DOGE,ADA,DAI,DOT,TRX,LTC,SHIB,SOL,UNI,AVAX,LINK,XMR,ATOM,ETC&tsyms=USD,EUR,CNY,GBP&extraParams=W_google.com';
	var xhr = typeof XMLHttpRequest != 'undefined' ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
	
	xhr.open('get', url, true);
	xhr.onreadystatechange = function() {
		var status;
		var data;
		
		if (xhr.readyState == 4) {
			status = xhr.status;
			if (status == 200) {
				data = JSON.parse(xhr.responseText);
				
				var fsyms = 'BTC,ETH,BNB,XRP,MATIC,DOGE,ADA,DAI,DOT,TRX,LTC,SHIB,SOL,UNI,AVAX,LINK,XMR,ATOM,ETC'.split(',');
				var tsyms = 'USD,EUR,CNY,GBP'.split(',');
				
				for (var i = 0; i < fsyms.length; i++) {
					for (var k = 0; k < tsyms.length; k++) {
						var fsym = fsyms[i];
						var tsym = tsyms[k];
						if(fsym==tsym){continue;};
						var priceElm = document.getElementById('CCCHeader3Price_' + fsym + '_' + tsym);
						
						priceElm.innerHTML = data.DISPLAY[fsym][tsym].PRICE;

						if (cccCurrentTheme.General.showChangePercent){
							var changePctContainer = document.getElementById('CCCHeader3ChangePctContainer_' + fsym + '_' + tsym);
							var changePctElm = document.getElementById('CCCHeader3ChangePct_' + fsym + '_' + tsym);
							ChangePct = data.RAW[fsym][tsym].CHANGEPCT24HOUR;
						
							changePctElm = data.DISPLAY[fsym][tsym].CHANGEPCT24HOUR+' %';
							if (ChangePct >= 0) {
								changePctContainer.style.color = cccCurrentTheme.Trend.colorUp;
							} else {
								changePctContainer.style.color = cccCurrentTheme.Trend.colorDown;
							}
						}
					}
				}
			} else {
				// pass
			}
		}
	};
	xhr.send();
}

var cccCurrentTheme = {
		General: {
			background: '#FFF',
			priceText: '#000',
			showLogo: true,
			showChangePercent: true,
			enableMarquee: false
		},
		Currency: {
			color: '#000'			
		},
		Trend: {
		  colorUp: '#3d9400',
		  colorDown: '#A11B0A',
		  colorUnchanged: '#2C4C76'				
		}
};

if (typeof cccTheme !== 'undefined') {
	for(var key in cccCurrentTheme) {
		var group = cccCurrentTheme[key];
		for(var prop in group) {
			if(!group.hasOwnProperty(prop)) continue;
			if(cccTheme.hasOwnProperty(key) && cccTheme[key].hasOwnProperty(prop)) {
				cccCurrentTheme[key][prop] = cccTheme[key][prop];
			}
		}
	}
}

if (typeof cccThemeV3Header !== 'undefined') {
	for(var key in cccCurrentTheme) {
		var group = cccCurrentTheme[key];
		for(var prop in group) {
			if(!group.hasOwnProperty(prop)) continue;
			if(cccThemeV3Header.hasOwnProperty(key) && cccThemeV3Header[key].hasOwnProperty(prop)) {
				cccCurrentTheme[key][prop] = cccThemeV3Header[key][prop];
			}
		}
	}
}


var embedable      = document.createElement("div");
var embedableChart = document.createElement("div");
var style          = document.createElement("style");

embedable.className             = "ccc-widget ccc-header-v3";
embedable.id 				    = 'marquee-container';
embedable.style.background      = cccCurrentTheme.General.background;
embedable.style.boxSizing       = "border-box";
embedable.style.lineHeight      = "1";
embedable.style.overflow     	= "hidden";

cccCreateCSSSelector('#marq_kill_marg_bor', 'border:none!important;margin:0!important');
cccCreateCSSSelector('.ccc-coin-header-v3-container', 'white-space: nowrap;');
cccCreateCSSSelector('.ccc-header-v3-ccc-price-container', 'margin-right: 15px; display: inline-block;');
cccCreateCSSSelector('.ccc-header-v3 a', 'text-decoration: none; display: inline-block;');
cccCreateCSSSelector('.ccc-header-v3 a:hover', 'text-decoration: none;');
cccCreateCSSSelector('.ccc-header-v3 a:focus', 'text-decoration: none;');
cccCreateCSSSelector('.ccc-header-v3-price-name', 'vertical-align: middle; font-family: Roboto, sans-serif; color: ' + cccCurrentTheme.Currency.color + '; font-weight: 100;  margin: 0px; color: ' + cccCurrentTheme.General.priceText );
cccCreateCSSSelector('.ccc-header-v3-price-value', 'vertical-align: middle; font-family: "Roboto", sans-serif;  text-decoration: none; ');
cccCreateCSSSelector('.ccc-header-v3-price-change', 'font-family: "Roboto", sans-serif; display:inline-block; vertical-align: middle;');

var inner = document.createElement("div");
inner.id = "marquee-inner";

var embedableCoin                   = document.createElement("div");
embedableCoin.className             = "ccc-coin-header-v3-container marquee";
embedableCoin.id           			= "marquee-element";
embedableCoin.style.margin          = "0px";
embedableCoin.style.padding         = "0px";
embedableCoin.style.whiteSpace 		= "no-wrap";
embedableCoin.style.transition 		= "1s all linear";


	var fsym = 'BTC';
	
	
	var priceDiv                   = document.createElement("div");
	priceDiv.className             = "ccc-header-v3-ccc-price-container";
	var elChange = '';
	var elLogo	 = '';

	if (cccCurrentTheme.General.showChangePercent)
		elChange = `
					<span
						class="ccc-header-v3-price-change"
						id="CCCHeader3ChangePctContainer_` + fsym + `_USD"
						style="color: ` + cccCurrentTheme.Trend.colorUp + `;"
					>
						(<span id="CCCHeader3ChangePct` + fsym + `_USD">2.90 %</span>)
					</span>
		`;
	
	if (cccCurrentTheme.General.showLogo) {
		elLogo = `
			<img class="ccc-header-v3-price-logo" src="https://www.cryptocompare.com/media/37746251/btc.png" style="width: 15px; height: 15px; vertical-align: middle;"/>
		`;	
	}
		


	priceDiv.innerHTML    		   = `
									<a href="https://www.cryptocompare.com/coins/btc/overview/usd" target="_blank" rel="nofollow">
										` + elLogo + `
										<span class="ccc-header-v3-price-name">BTC: </span>
										<span class="ccc-header-v3-price-value"  style="color: ` + cccCurrentTheme.General.priceText + `;" id="CCCHeader3Price_` + fsym + `_USD" >
											$ 94,563.9
										</span>
										` + elChange + `
									</a>
									`;
	embedableCoin.appendChild(priceDiv);
	
	var priceDiv                   = document.createElement("div");
	priceDiv.className             = "ccc-header-v3-ccc-price-container";
	var elChange = '';
	var elLogo	 = '';

	if (cccCurrentTheme.General.showChangePercent)
		elChange = `
					<span
						class="ccc-header-v3-price-change"
						id="CCCHeader3ChangePctContainer_` + fsym + `_EUR"
						style="color: ` + cccCurrentTheme.Trend.colorUp + `;"
					>
						(<span id="CCCHeader3ChangePct` + fsym + `_EUR">3.08 %</span>)
					</span>
		`;
	
	if (cccCurrentTheme.General.showLogo) {
		elLogo = `
			<img class="ccc-header-v3-price-logo" src="https://www.cryptocompare.com/media/37746251/btc.png" style="width: 15px; height: 15px; vertical-align: middle;"/>
		`;	
	}
		


	priceDiv.innerHTML    		   = `
									<a href="https://www.cryptocompare.com/coins/btc/overview/eur" target="_blank" rel="nofollow">
										` + elLogo + `
										<span class="ccc-header-v3-price-name">BTC: </span>
										<span class="ccc-header-v3-price-value"  style="color: ` + cccCurrentTheme.General.priceText + `;" id="CCCHeader3Price_` + fsym + `_EUR" >
											€ 89,566.2
										</span>
										` + elChange + `
									</a>
									`;
	embedableCoin.appendChild(priceDiv);
	
	var priceDiv                   = document.createElement("div");
	priceDiv.className             = "ccc-header-v3-ccc-price-container";
	var elChange = '';
	var elLogo	 = '';

	if (cccCurrentTheme.General.showChangePercent)
		elChange = `
					<span
						class="ccc-header-v3-price-change"
						id="CCCHeader3ChangePctContainer_` + fsym + `_CNY"
						style="color: ` + cccCurrentTheme.Trend.colorUp + `;"
					>
						(<span id="CCCHeader3ChangePct` + fsym + `_CNY">0.00 %</span>)
					</span>
		`;
	
	if (cccCurrentTheme.General.showLogo) {
		elLogo = `
			<img class="ccc-header-v3-price-logo" src="https://www.cryptocompare.com/media/37746251/btc.png" style="width: 15px; height: 15px; vertical-align: middle;"/>
		`;	
	}
		


	priceDiv.innerHTML    		   = `
									<a href="https://www.cryptocompare.com/coins/btc/overview/cny" target="_blank" rel="nofollow">
										` + elLogo + `
										<span class="ccc-header-v3-price-name">BTC: </span>
										<span class="ccc-header-v3-price-value"  style="color: ` + cccCurrentTheme.General.priceText + `;" id="CCCHeader3Price_` + fsym + `_CNY" >
											¥ 38,800.0
										</span>
										` + elChange + `
									</a>
									`;
	embedableCoin.appendChild(priceDiv);
	
	var priceDiv                   = document.createElement("div");
	priceDiv.className             = "ccc-header-v3-ccc-price-container";
	var elChange = '';
	var elLogo	 = '';

	if (cccCurrentTheme.General.showChangePercent)
		elChange = `
					<span
						class="ccc-header-v3-price-change"
						id="CCCHeader3ChangePctContainer_` + fsym + `_GBP"
						style="color: ` + cccCurrentTheme.Trend.colorUp + `;"
					>
						(<span id="CCCHeader3ChangePct` + fsym + `_GBP">2.68 %</span>)
					</span>
		`;
	
	if (cccCurrentTheme.General.showLogo) {
		elLogo = `
			<img class="ccc-header-v3-price-logo" src="https://www.cryptocompare.com/media/37746251/btc.png" style="width: 15px; height: 15px; vertical-align: middle;"/>
		`;	
	}
		


	priceDiv.innerHTML    		   = `
									<a href="https://www.cryptocompare.com/coins/btc/overview/gbp" target="_blank" rel="nofollow">
										` + elLogo + `
										<span class="ccc-header-v3-price-name">BTC: </span>
										<span class="ccc-header-v3-price-value"  style="color: ` + cccCurrentTheme.General.priceText + `;" id="CCCHeader3Price_` + fsym + `_GBP" >
											£ 74,613.8
										</span>
										` + elChange + `
									</a>
									`;
	embedableCoin.appendChild(priceDiv);
	

	var fsym = 'ETH';
	
	
	var priceDiv                   = document.createElement("div");
	priceDiv.className             = "ccc-header-v3-ccc-price-container";
	var elChange = '';
	var elLogo	 = '';

	if (cccCurrentTheme.General.showChangePercent)
		elChange = `
					<span
						class="ccc-header-v3-price-change"
						id="CCCHeader3ChangePctContainer_` + fsym + `_USD"
						style="color: ` + cccCurrentTheme.Trend.colorUp + `;"
					>
						(<span id="CCCHeader3ChangePct` + fsym + `_USD">1.46 %</span>)
					</span>
		`;
	
	if (cccCurrentTheme.General.showLogo) {
		elLogo = `
			<img class="ccc-header-v3-price-logo" src="https://www.cryptocompare.com/media/37746238/eth.png" style="width: 15px; height: 15px; vertical-align: middle;"/>
		`;	
	}
		


	priceDiv.innerHTML    		   = `
									<a href="https://www.cryptocompare.com/coins/eth/overview/usd" target="_blank" rel="nofollow">
										` + elLogo + `
										<span class="ccc-header-v3-price-name">ETH: </span>
										<span class="ccc-header-v3-price-value"  style="color: ` + cccCurrentTheme.General.priceText + `;" id="CCCHeader3Price_` + fsym + `_USD" >
											$ 3,143.05
										</span>
										` + elChange + `
									</a>
									`;
	embedableCoin.appendChild(priceDiv);
	
	var priceDiv                   = document.createElement("div");
	priceDiv.className             = "ccc-header-v3-ccc-price-container";
	var elChange = '';
	var elLogo	 = '';

	if (cccCurrentTheme.General.showChangePercent)
		elChange = `
					<span
						class="ccc-header-v3-price-change"
						id="CCCHeader3ChangePctContainer_` + fsym + `_EUR"
						style="color: ` + cccCurrentTheme.Trend.colorUp + `;"
					>
						(<span id="CCCHeader3ChangePct` + fsym + `_EUR">1.64 %</span>)
					</span>
		`;
	
	if (cccCurrentTheme.General.showLogo) {
		elLogo = `
			<img class="ccc-header-v3-price-logo" src="https://www.cryptocompare.com/media/37746238/eth.png" style="width: 15px; height: 15px; vertical-align: middle;"/>
		`;	
	}
		


	priceDiv.innerHTML    		   = `
									<a href="https://www.cryptocompare.com/coins/eth/overview/eur" target="_blank" rel="nofollow">
										` + elLogo + `
										<span class="ccc-header-v3-price-name">ETH: </span>
										<span class="ccc-header-v3-price-value"  style="color: ` + cccCurrentTheme.General.priceText + `;" id="CCCHeader3Price_` + fsym + `_EUR" >
											€ 2,977.69
										</span>
										` + elChange + `
									</a>
									`;
	embedableCoin.appendChild(priceDiv);
	
	var priceDiv                   = document.createElement("div");
	priceDiv.className             = "ccc-header-v3-ccc-price-container";
	var elChange = '';
	var elLogo	 = '';

	if (cccCurrentTheme.General.showChangePercent)
		elChange = `
					<span
						class="ccc-header-v3-price-change"
						id="CCCHeader3ChangePctContainer_` + fsym + `_CNY"
						style="color: ` + cccCurrentTheme.Trend.colorDown + `;"
					>
						(<span id="CCCHeader3ChangePct` + fsym + `_CNY">-1.43 %</span>)
					</span>
		`;
	
	if (cccCurrentTheme.General.showLogo) {
		elLogo = `
			<img class="ccc-header-v3-price-logo" src="https://www.cryptocompare.com/media/37746238/eth.png" style="width: 15px; height: 15px; vertical-align: middle;"/>
		`;	
	}
		


	priceDiv.innerHTML    		   = `
									<a href="https://www.cryptocompare.com/coins/eth/overview/cny" target="_blank" rel="nofollow">
										` + elLogo + `
										<span class="ccc-header-v3-price-name">ETH: </span>
										<span class="ccc-header-v3-price-value"  style="color: ` + cccCurrentTheme.General.priceText + `;" id="CCCHeader3Price_` + fsym + `_CNY" >
											¥ 1,289.43
										</span>
										` + elChange + `
									</a>
									`;
	embedableCoin.appendChild(priceDiv);
	
	var priceDiv                   = document.createElement("div");
	priceDiv.className             = "ccc-header-v3-ccc-price-container";
	var elChange = '';
	var elLogo	 = '';

	if (cccCurrentTheme.General.showChangePercent)
		elChange = `
					<span
						class="ccc-header-v3-price-change"
						id="CCCHeader3ChangePctContainer_` + fsym + `_GBP"
						style="color: ` + cccCurrentTheme.Trend.colorUp + `;"
					>
						(<span id="CCCHeader3ChangePct` + fsym + `_GBP">1.16 %</span>)
					</span>
		`;
	
	if (cccCurrentTheme.General.showLogo) {
		elLogo = `
			<img class="ccc-header-v3-price-logo" src="https://www.cryptocompare.com/media/37746238/eth.png" style="width: 15px; height: 15px; vertical-align: middle;"/>
		`;	
	}
		


	priceDiv.innerHTML    		   = `
									<a href="https://www.cryptocompare.com/coins/eth/overview/gbp" target="_blank" rel="nofollow">
										` + elLogo + `
										<span class="ccc-header-v3-price-name">ETH: </span>
										<span class="ccc-header-v3-price-value"  style="color: ` + cccCurrentTheme.General.priceText + `;" id="CCCHeader3Price_` + fsym + `_GBP" >
											£ 2,478.36
										</span>
										` + elChange + `
									</a>
									`;
	embedableCoin.appendChild(priceDiv);
	

	var fsym = 'BNB';
	
	
	var priceDiv                   = document.createElement("div");
	priceDiv.className             = "ccc-header-v3-ccc-price-container";
	var elChange = '';
	var elLogo	 = '';

	if (cccCurrentTheme.General.showChangePercent)
		elChange = `
					<span
						class="ccc-header-v3-price-change"
						id="CCCHeader3ChangePctContainer_` + fsym + `_USD"
						style="color: ` + cccCurrentTheme.Trend.colorUp + `;"
					>
						(<span id="CCCHeader3ChangePct` + fsym + `_USD">1.01 %</span>)
					</span>
		`;
	
	if (cccCurrentTheme.General.showLogo) {
		elLogo = `
			<img class="ccc-header-v3-price-logo" src="https://www.cryptocompare.com/media/40485170/bnb.png" style="width: 15px; height: 15px; vertical-align: middle;"/>
		`;	
	}
		


	priceDiv.innerHTML    		   = `
									<a href="https://www.cryptocompare.com/coins/bnb/overview/usd" target="_blank" rel="nofollow">
										` + elLogo + `
										<span class="ccc-header-v3-price-name">BNB: </span>
										<span class="ccc-header-v3-price-value"  style="color: ` + cccCurrentTheme.General.priceText + `;" id="CCCHeader3Price_` + fsym + `_USD" >
											$ 619.90
										</span>
										` + elChange + `
									</a>
									`;
	embedableCoin.appendChild(priceDiv);
	
	var priceDiv                   = document.createElement("div");
	priceDiv.className             = "ccc-header-v3-ccc-price-container";
	var elChange = '';
	var elLogo	 = '';

	if (cccCurrentTheme.General.showChangePercent)
		elChange = `
					<span
						class="ccc-header-v3-price-change"
						id="CCCHeader3ChangePctContainer_` + fsym + `_EUR"
						style="color: ` + cccCurrentTheme.Trend.colorUp + `;"
					>
						(<span id="CCCHeader3ChangePct` + fsym + `_EUR">1.22 %</span>)
					</span>
		`;
	
	if (cccCurrentTheme.General.showLogo) {
		elLogo = `
			<img class="ccc-header-v3-price-logo" src="https://www.cryptocompare.com/media/40485170/bnb.png" style="width: 15px; height: 15px; vertical-align: middle;"/>
		`;	
	}
		


	priceDiv.innerHTML    		   = `
									<a href="https://www.cryptocompare.com/coins/bnb/overview/eur" target="_blank" rel="nofollow">
										` + elLogo + `
										<span class="ccc-header-v3-price-name">BNB: </span>
										<span class="ccc-header-v3-price-value"  style="color: ` + cccCurrentTheme.General.priceText + `;" id="CCCHeader3Price_` + fsym + `_EUR" >
											€ 587.42
										</span>
										` + elChange + `
									</a>
									`;
	embedableCoin.appendChild(priceDiv);
	
	var priceDiv                   = document.createElement("div");
	priceDiv.className             = "ccc-header-v3-ccc-price-container";
	var elChange = '';
	var elLogo	 = '';

	if (cccCurrentTheme.General.showChangePercent)
		elChange = `
					<span
						class="ccc-header-v3-price-change"
						id="CCCHeader3ChangePctContainer_` + fsym + `_CNY"
						style="color: ` + cccCurrentTheme.Trend.colorDown + `;"
					>
						(<span id="CCCHeader3ChangePct` + fsym + `_CNY">-1.87 %</span>)
					</span>
		`;
	
	if (cccCurrentTheme.General.showLogo) {
		elLogo = `
			<img class="ccc-header-v3-price-logo" src="https://www.cryptocompare.com/media/40485170/bnb.png" style="width: 15px; height: 15px; vertical-align: middle;"/>
		`;	
	}
		


	priceDiv.innerHTML    		   = `
									<a href="https://www.cryptocompare.com/coins/bnb/overview/cny" target="_blank" rel="nofollow">
										` + elLogo + `
										<span class="ccc-header-v3-price-name">BNB: </span>
										<span class="ccc-header-v3-price-value"  style="color: ` + cccCurrentTheme.General.priceText + `;" id="CCCHeader3Price_` + fsym + `_CNY" >
											¥ 254.37
										</span>
										` + elChange + `
									</a>
									`;
	embedableCoin.appendChild(priceDiv);
	
	var priceDiv                   = document.createElement("div");
	priceDiv.className             = "ccc-header-v3-ccc-price-container";
	var elChange = '';
	var elLogo	 = '';

	if (cccCurrentTheme.General.showChangePercent)
		elChange = `
					<span
						class="ccc-header-v3-price-change"
						id="CCCHeader3ChangePctContainer_` + fsym + `_GBP"
						style="color: ` + cccCurrentTheme.Trend.colorUp + `;"
					>
						(<span id="CCCHeader3ChangePct` + fsym + `_GBP">0.82 %</span>)
					</span>
		`;
	
	if (cccCurrentTheme.General.showLogo) {
		elLogo = `
			<img class="ccc-header-v3-price-logo" src="https://www.cryptocompare.com/media/40485170/bnb.png" style="width: 15px; height: 15px; vertical-align: middle;"/>
		`;	
	}
		


	priceDiv.innerHTML    		   = `
									<a href="https://www.cryptocompare.com/coins/bnb/overview/gbp" target="_blank" rel="nofollow">
										` + elLogo + `
										<span class="ccc-header-v3-price-name">BNB: </span>
										<span class="ccc-header-v3-price-value"  style="color: ` + cccCurrentTheme.General.priceText + `;" id="CCCHeader3Price_` + fsym + `_GBP" >
											£ 489.31
										</span>
										` + elChange + `
									</a>
									`;
	embedableCoin.appendChild(priceDiv);
	

	var fsym = 'XRP';
	
	
	var priceDiv                   = document.createElement("div");
	priceDiv.className             = "ccc-header-v3-ccc-price-container";
	var elChange = '';
	var elLogo	 = '';

	if (cccCurrentTheme.General.showChangePercent)
		elChange = `
					<span
						class="ccc-header-v3-price-change"
						id="CCCHeader3ChangePctContainer_` + fsym + `_USD"
						style="color: ` + cccCurrentTheme.Trend.colorUp + `;"
					>
						(<span id="CCCHeader3ChangePct` + fsym + `_USD">5.09 %</span>)
					</span>
		`;
	
	if (cccCurrentTheme.General.showLogo) {
		elLogo = `
			<img class="ccc-header-v3-price-logo" src="https://www.cryptocompare.com/media/38553096/xrp.png" style="width: 15px; height: 15px; vertical-align: middle;"/>
		`;	
	}
		


	priceDiv.innerHTML    		   = `
									<a href="https://www.cryptocompare.com/coins/xrp/overview/usd" target="_blank" rel="nofollow">
										` + elLogo + `
										<span class="ccc-header-v3-price-name">XRP: </span>
										<span class="ccc-header-v3-price-value"  style="color: ` + cccCurrentTheme.General.priceText + `;" id="CCCHeader3Price_` + fsym + `_USD" >
											$ 1.14
										</span>
										` + elChange + `
									</a>
									`;
	embedableCoin.appendChild(priceDiv);
	
	var priceDiv                   = document.createElement("div");
	priceDiv.className             = "ccc-header-v3-ccc-price-container";
	var elChange = '';
	var elLogo	 = '';

	if (cccCurrentTheme.General.showChangePercent)
		elChange = `
					<span
						class="ccc-header-v3-price-change"
						id="CCCHeader3ChangePctContainer_` + fsym + `_EUR"
						style="color: ` + cccCurrentTheme.Trend.colorUp + `;"
					>
						(<span id="CCCHeader3ChangePct` + fsym + `_EUR">5.34 %</span>)
					</span>
		`;
	
	if (cccCurrentTheme.General.showLogo) {
		elLogo = `
			<img class="ccc-header-v3-price-logo" src="https://www.cryptocompare.com/media/38553096/xrp.png" style="width: 15px; height: 15px; vertical-align: middle;"/>
		`;	
	}
		


	priceDiv.innerHTML    		   = `
									<a href="https://www.cryptocompare.com/coins/xrp/overview/eur" target="_blank" rel="nofollow">
										` + elLogo + `
										<span class="ccc-header-v3-price-name">XRP: </span>
										<span class="ccc-header-v3-price-value"  style="color: ` + cccCurrentTheme.General.priceText + `;" id="CCCHeader3Price_` + fsym + `_EUR" >
											€ 1.08
										</span>
										` + elChange + `
									</a>
									`;
	embedableCoin.appendChild(priceDiv);
	
	var priceDiv                   = document.createElement("div");
	priceDiv.className             = "ccc-header-v3-ccc-price-container";
	var elChange = '';
	var elLogo	 = '';

	if (cccCurrentTheme.General.showChangePercent)
		elChange = `
					<span
						class="ccc-header-v3-price-change"
						id="CCCHeader3ChangePctContainer_` + fsym + `_CNY"
						style="color: ` + cccCurrentTheme.Trend.colorUp + `;"
					>
						(<span id="CCCHeader3ChangePct` + fsym + `_CNY">2.17 %</span>)
					</span>
		`;
	
	if (cccCurrentTheme.General.showLogo) {
		elLogo = `
			<img class="ccc-header-v3-price-logo" src="https://www.cryptocompare.com/media/38553096/xrp.png" style="width: 15px; height: 15px; vertical-align: middle;"/>
		`;	
	}
		


	priceDiv.innerHTML    		   = `
									<a href="https://www.cryptocompare.com/coins/xrp/overview/cny" target="_blank" rel="nofollow">
										` + elLogo + `
										<span class="ccc-header-v3-price-name">XRP: </span>
										<span class="ccc-header-v3-price-value"  style="color: ` + cccCurrentTheme.General.priceText + `;" id="CCCHeader3Price_` + fsym + `_CNY" >
											¥ 0.4671
										</span>
										` + elChange + `
									</a>
									`;
	embedableCoin.appendChild(priceDiv);
	
	var priceDiv                   = document.createElement("div");
	priceDiv.className             = "ccc-header-v3-ccc-price-container";
	var elChange = '';
	var elLogo	 = '';

	if (cccCurrentTheme.General.showChangePercent)
		elChange = `
					<span
						class="ccc-header-v3-price-change"
						id="CCCHeader3ChangePctContainer_` + fsym + `_GBP"
						style="color: ` + cccCurrentTheme.Trend.colorUp + `;"
					>
						(<span id="CCCHeader3ChangePct` + fsym + `_GBP">4.77 %</span>)
					</span>
		`;
	
	if (cccCurrentTheme.General.showLogo) {
		elLogo = `
			<img class="ccc-header-v3-price-logo" src="https://www.cryptocompare.com/media/38553096/xrp.png" style="width: 15px; height: 15px; vertical-align: middle;"/>
		`;	
	}
		


	priceDiv.innerHTML    		   = `
									<a href="https://www.cryptocompare.com/coins/xrp/overview/gbp" target="_blank" rel="nofollow">
										` + elLogo + `
										<span class="ccc-header-v3-price-name">XRP: </span>
										<span class="ccc-header-v3-price-value"  style="color: ` + cccCurrentTheme.General.priceText + `;" id="CCCHeader3Price_` + fsym + `_GBP" >
											£ 0.8976
										</span>
										` + elChange + `
									</a>
									`;
	embedableCoin.appendChild(priceDiv);
	

	var fsym = 'MATIC';
	
	
	var priceDiv                   = document.createElement("div");
	priceDiv.className             = "ccc-header-v3-ccc-price-container";
	var elChange = '';
	var elLogo	 = '';

	if (cccCurrentTheme.General.showChangePercent)
		elChange = `
					<span
						class="ccc-header-v3-price-change"
						id="CCCHeader3ChangePctContainer_` + fsym + `_USD"
						style="color: ` + cccCurrentTheme.Trend.colorUp + `;"
					>
						(<span id="CCCHeader3ChangePct` + fsym + `_USD">6.74 %</span>)
					</span>
		`;
	
	if (cccCurrentTheme.General.showLogo) {
		elLogo = `
			<img class="ccc-header-v3-price-logo" src="https://www.cryptocompare.com/media/37746047/matic.png" style="width: 15px; height: 15px; vertical-align: middle;"/>
		`;	
	}
		


	priceDiv.innerHTML    		   = `
									<a href="https://www.cryptocompare.com/coins/matic/overview/usd" target="_blank" rel="nofollow">
										` + elLogo + `
										<span class="ccc-header-v3-price-name">MATIC: </span>
										<span class="ccc-header-v3-price-value"  style="color: ` + cccCurrentTheme.General.priceText + `;" id="CCCHeader3Price_` + fsym + `_USD" >
											$ 0.4601
										</span>
										` + elChange + `
									</a>
									`;
	embedableCoin.appendChild(priceDiv);
	
	var priceDiv                   = document.createElement("div");
	priceDiv.className             = "ccc-header-v3-ccc-price-container";
	var elChange = '';
	var elLogo	 = '';

	if (cccCurrentTheme.General.showChangePercent)
		elChange = `
					<span
						class="ccc-header-v3-price-change"
						id="CCCHeader3ChangePctContainer_` + fsym + `_EUR"
						style="color: ` + cccCurrentTheme.Trend.colorUp + `;"
					>
						(<span id="CCCHeader3ChangePct` + fsym + `_EUR">6.87 %</span>)
					</span>
		`;
	
	if (cccCurrentTheme.General.showLogo) {
		elLogo = `
			<img class="ccc-header-v3-price-logo" src="https://www.cryptocompare.com/media/37746047/matic.png" style="width: 15px; height: 15px; vertical-align: middle;"/>
		`;	
	}
		


	priceDiv.innerHTML    		   = `
									<a href="https://www.cryptocompare.com/coins/matic/overview/eur" target="_blank" rel="nofollow">
										` + elLogo + `
										<span class="ccc-header-v3-price-name">MATIC: </span>
										<span class="ccc-header-v3-price-value"  style="color: ` + cccCurrentTheme.General.priceText + `;" id="CCCHeader3Price_` + fsym + `_EUR" >
											€ 0.4357
										</span>
										` + elChange + `
									</a>
									`;
	embedableCoin.appendChild(priceDiv);
	
	var priceDiv                   = document.createElement("div");
	priceDiv.className             = "ccc-header-v3-ccc-price-container";
	var elChange = '';
	var elLogo	 = '';

	if (cccCurrentTheme.General.showChangePercent)
		elChange = `
					<span
						class="ccc-header-v3-price-change"
						id="CCCHeader3ChangePctContainer_` + fsym + `_CNY"
						style="color: ` + cccCurrentTheme.Trend.colorUp + `;"
					>
						(<span id="CCCHeader3ChangePct` + fsym + `_CNY">4.29 %</span>)
					</span>
		`;
	
	if (cccCurrentTheme.General.showLogo) {
		elLogo = `
			<img class="ccc-header-v3-price-logo" src="https://www.cryptocompare.com/media/37746047/matic.png" style="width: 15px; height: 15px; vertical-align: middle;"/>
		`;	
	}
		


	priceDiv.innerHTML    		   = `
									<a href="https://www.cryptocompare.com/coins/matic/overview/cny" target="_blank" rel="nofollow">
										` + elLogo + `
										<span class="ccc-header-v3-price-name">MATIC: </span>
										<span class="ccc-header-v3-price-value"  style="color: ` + cccCurrentTheme.General.priceText + `;" id="CCCHeader3Price_` + fsym + `_CNY" >
											¥ 0.1894
										</span>
										` + elChange + `
									</a>
									`;
	embedableCoin.appendChild(priceDiv);
	
	var priceDiv                   = document.createElement("div");
	priceDiv.className             = "ccc-header-v3-ccc-price-container";
	var elChange = '';
	var elLogo	 = '';

	if (cccCurrentTheme.General.showChangePercent)
		elChange = `
					<span
						class="ccc-header-v3-price-change"
						id="CCCHeader3ChangePctContainer_` + fsym + `_GBP"
						style="color: ` + cccCurrentTheme.Trend.colorUp + `;"
					>
						(<span id="CCCHeader3ChangePct` + fsym + `_GBP">6.23 %</span>)
					</span>
		`;
	
	if (cccCurrentTheme.General.showLogo) {
		elLogo = `
			<img class="ccc-header-v3-price-logo" src="https://www.cryptocompare.com/media/37746047/matic.png" style="width: 15px; height: 15px; vertical-align: middle;"/>
		`;	
	}
		


	priceDiv.innerHTML    		   = `
									<a href="https://www.cryptocompare.com/coins/matic/overview/gbp" target="_blank" rel="nofollow">
										` + elLogo + `
										<span class="ccc-header-v3-price-name">MATIC: </span>
										<span class="ccc-header-v3-price-value"  style="color: ` + cccCurrentTheme.General.priceText + `;" id="CCCHeader3Price_` + fsym + `_GBP" >
											£ 0.3637
										</span>
										` + elChange + `
									</a>
									`;
	embedableCoin.appendChild(priceDiv);
	

	var fsym = 'DOGE';
	
	
	var priceDiv                   = document.createElement("div");
	priceDiv.className             = "ccc-header-v3-ccc-price-container";
	var elChange = '';
	var elLogo	 = '';

	if (cccCurrentTheme.General.showChangePercent)
		elChange = `
					<span
						class="ccc-header-v3-price-change"
						id="CCCHeader3ChangePctContainer_` + fsym + `_USD"
						style="color: ` + cccCurrentTheme.Trend.colorUp + `;"
					>
						(<span id="CCCHeader3ChangePct` + fsym + `_USD">1.27 %</span>)
					</span>
		`;
	
	if (cccCurrentTheme.General.showLogo) {
		elLogo = `
			<img class="ccc-header-v3-price-logo" src="https://www.cryptocompare.com/media/37746339/doge.png" style="width: 15px; height: 15px; vertical-align: middle;"/>
		`;	
	}
		


	priceDiv.innerHTML    		   = `
									<a href="https://www.cryptocompare.com/coins/doge/overview/usd" target="_blank" rel="nofollow">
										` + elLogo + `
										<span class="ccc-header-v3-price-name">DOGE: </span>
										<span class="ccc-header-v3-price-value"  style="color: ` + cccCurrentTheme.General.priceText + `;" id="CCCHeader3Price_` + fsym + `_USD" >
											$ 0.3936
										</span>
										` + elChange + `
									</a>
									`;
	embedableCoin.appendChild(priceDiv);
	
	var priceDiv                   = document.createElement("div");
	priceDiv.className             = "ccc-header-v3-ccc-price-container";
	var elChange = '';
	var elLogo	 = '';

	if (cccCurrentTheme.General.showChangePercent)
		elChange = `
					<span
						class="ccc-header-v3-price-change"
						id="CCCHeader3ChangePctContainer_` + fsym + `_EUR"
						style="color: ` + cccCurrentTheme.Trend.colorUp + `;"
					>
						(<span id="CCCHeader3ChangePct` + fsym + `_EUR">1.34 %</span>)
					</span>
		`;
	
	if (cccCurrentTheme.General.showLogo) {
		elLogo = `
			<img class="ccc-header-v3-price-logo" src="https://www.cryptocompare.com/media/37746339/doge.png" style="width: 15px; height: 15px; vertical-align: middle;"/>
		`;	
	}
		


	priceDiv.innerHTML    		   = `
									<a href="https://www.cryptocompare.com/coins/doge/overview/eur" target="_blank" rel="nofollow">
										` + elLogo + `
										<span class="ccc-header-v3-price-name">DOGE: </span>
										<span class="ccc-header-v3-price-value"  style="color: ` + cccCurrentTheme.General.priceText + `;" id="CCCHeader3Price_` + fsym + `_EUR" >
											€ 0.3727
										</span>
										` + elChange + `
									</a>
									`;
	embedableCoin.appendChild(priceDiv);
	
	var priceDiv                   = document.createElement("div");
	priceDiv.className             = "ccc-header-v3-ccc-price-container";
	var elChange = '';
	var elLogo	 = '';

	if (cccCurrentTheme.General.showChangePercent)
		elChange = `
					<span
						class="ccc-header-v3-price-change"
						id="CCCHeader3ChangePctContainer_` + fsym + `_CNY"
						style="color: ` + cccCurrentTheme.Trend.colorDown + `;"
					>
						(<span id="CCCHeader3ChangePct` + fsym + `_CNY">-1.65 %</span>)
					</span>
		`;
	
	if (cccCurrentTheme.General.showLogo) {
		elLogo = `
			<img class="ccc-header-v3-price-logo" src="https://www.cryptocompare.com/media/37746339/doge.png" style="width: 15px; height: 15px; vertical-align: middle;"/>
		`;	
	}
		


	priceDiv.innerHTML    		   = `
									<a href="https://www.cryptocompare.com/coins/doge/overview/cny" target="_blank" rel="nofollow">
										` + elLogo + `
										<span class="ccc-header-v3-price-name">DOGE: </span>
										<span class="ccc-header-v3-price-value"  style="color: ` + cccCurrentTheme.General.priceText + `;" id="CCCHeader3Price_` + fsym + `_CNY" >
											¥ 0.1614
										</span>
										` + elChange + `
									</a>
									`;
	embedableCoin.appendChild(priceDiv);
	
	var priceDiv                   = document.createElement("div");
	priceDiv.className             = "ccc-header-v3-ccc-price-container";
	var elChange = '';
	var elLogo	 = '';

	if (cccCurrentTheme.General.showChangePercent)
		elChange = `
					<span
						class="ccc-header-v3-price-change"
						id="CCCHeader3ChangePctContainer_` + fsym + `_GBP"
						style="color: ` + cccCurrentTheme.Trend.colorUp + `;"
					>
						(<span id="CCCHeader3ChangePct` + fsym + `_GBP">0.98 %</span>)
					</span>
		`;
	
	if (cccCurrentTheme.General.showLogo) {
		elLogo = `
			<img class="ccc-header-v3-price-logo" src="https://www.cryptocompare.com/media/37746339/doge.png" style="width: 15px; height: 15px; vertical-align: middle;"/>
		`;	
	}
		


	priceDiv.innerHTML    		   = `
									<a href="https://www.cryptocompare.com/coins/doge/overview/gbp" target="_blank" rel="nofollow">
										` + elLogo + `
										<span class="ccc-header-v3-price-name">DOGE: </span>
										<span class="ccc-header-v3-price-value"  style="color: ` + cccCurrentTheme.General.priceText + `;" id="CCCHeader3Price_` + fsym + `_GBP" >
											£ 0.3104
										</span>
										` + elChange + `
									</a>
									`;
	embedableCoin.appendChild(priceDiv);
	

	var fsym = 'ADA';
	
	
	var priceDiv                   = document.createElement("div");
	priceDiv.className             = "ccc-header-v3-ccc-price-container";
	var elChange = '';
	var elLogo	 = '';

	if (cccCurrentTheme.General.showChangePercent)
		elChange = `
					<span
						class="ccc-header-v3-price-change"
						id="CCCHeader3ChangePctContainer_` + fsym + `_USD"
						style="color: ` + cccCurrentTheme.Trend.colorUp + `;"
					>
						(<span id="CCCHeader3ChangePct` + fsym + `_USD">15.55 %</span>)
					</span>
		`;
	
	if (cccCurrentTheme.General.showLogo) {
		elLogo = `
			<img class="ccc-header-v3-price-logo" src="https://www.cryptocompare.com/media/37746235/ada.png" style="width: 15px; height: 15px; vertical-align: middle;"/>
		`;	
	}
		


	priceDiv.innerHTML    		   = `
									<a href="https://www.cryptocompare.com/coins/ada/overview/usd" target="_blank" rel="nofollow">
										` + elLogo + `
										<span class="ccc-header-v3-price-name">ADA: </span>
										<span class="ccc-header-v3-price-value"  style="color: ` + cccCurrentTheme.General.priceText + `;" id="CCCHeader3Price_` + fsym + `_USD" >
											$ 0.8398
										</span>
										` + elChange + `
									</a>
									`;
	embedableCoin.appendChild(priceDiv);
	
	var priceDiv                   = document.createElement("div");
	priceDiv.className             = "ccc-header-v3-ccc-price-container";
	var elChange = '';
	var elLogo	 = '';

	if (cccCurrentTheme.General.showChangePercent)
		elChange = `
					<span
						class="ccc-header-v3-price-change"
						id="CCCHeader3ChangePctContainer_` + fsym + `_EUR"
						style="color: ` + cccCurrentTheme.Trend.colorUp + `;"
					>
						(<span id="CCCHeader3ChangePct` + fsym + `_EUR">15.79 %</span>)
					</span>
		`;
	
	if (cccCurrentTheme.General.showLogo) {
		elLogo = `
			<img class="ccc-header-v3-price-logo" src="https://www.cryptocompare.com/media/37746235/ada.png" style="width: 15px; height: 15px; vertical-align: middle;"/>
		`;	
	}
		


	priceDiv.innerHTML    		   = `
									<a href="https://www.cryptocompare.com/coins/ada/overview/eur" target="_blank" rel="nofollow">
										` + elLogo + `
										<span class="ccc-header-v3-price-name">ADA: </span>
										<span class="ccc-header-v3-price-value"  style="color: ` + cccCurrentTheme.General.priceText + `;" id="CCCHeader3Price_` + fsym + `_EUR" >
											€ 0.7959
										</span>
										` + elChange + `
									</a>
									`;
	embedableCoin.appendChild(priceDiv);
	
	var priceDiv                   = document.createElement("div");
	priceDiv.className             = "ccc-header-v3-ccc-price-container";
	var elChange = '';
	var elLogo	 = '';

	if (cccCurrentTheme.General.showChangePercent)
		elChange = `
					<span
						class="ccc-header-v3-price-change"
						id="CCCHeader3ChangePctContainer_` + fsym + `_CNY"
						style="color: ` + cccCurrentTheme.Trend.colorUp + `;"
					>
						(<span id="CCCHeader3ChangePct` + fsym + `_CNY">0.00 %</span>)
					</span>
		`;
	
	if (cccCurrentTheme.General.showLogo) {
		elLogo = `
			<img class="ccc-header-v3-price-logo" src="https://www.cryptocompare.com/media/37746235/ada.png" style="width: 15px; height: 15px; vertical-align: middle;"/>
		`;	
	}
		


	priceDiv.innerHTML    		   = `
									<a href="https://www.cryptocompare.com/coins/ada/overview/cny" target="_blank" rel="nofollow">
										` + elLogo + `
										<span class="ccc-header-v3-price-name">ADA: </span>
										<span class="ccc-header-v3-price-value"  style="color: ` + cccCurrentTheme.General.priceText + `;" id="CCCHeader3Price_` + fsym + `_CNY" >
											¥ 8.58
										</span>
										` + elChange + `
									</a>
									`;
	embedableCoin.appendChild(priceDiv);
	
	var priceDiv                   = document.createElement("div");
	priceDiv.className             = "ccc-header-v3-ccc-price-container";
	var elChange = '';
	var elLogo	 = '';

	if (cccCurrentTheme.General.showChangePercent)
		elChange = `
					<span
						class="ccc-header-v3-price-change"
						id="CCCHeader3ChangePctContainer_` + fsym + `_GBP"
						style="color: ` + cccCurrentTheme.Trend.colorUp + `;"
					>
						(<span id="CCCHeader3ChangePct` + fsym + `_GBP">15.46 %</span>)
					</span>
		`;
	
	if (cccCurrentTheme.General.showLogo) {
		elLogo = `
			<img class="ccc-header-v3-price-logo" src="https://www.cryptocompare.com/media/37746235/ada.png" style="width: 15px; height: 15px; vertical-align: middle;"/>
		`;	
	}
		


	priceDiv.innerHTML    		   = `
									<a href="https://www.cryptocompare.com/coins/ada/overview/gbp" target="_blank" rel="nofollow">
										` + elLogo + `
										<span class="ccc-header-v3-price-name">ADA: </span>
										<span class="ccc-header-v3-price-value"  style="color: ` + cccCurrentTheme.General.priceText + `;" id="CCCHeader3Price_` + fsym + `_GBP" >
											£ 0.6631
										</span>
										` + elChange + `
									</a>
									`;
	embedableCoin.appendChild(priceDiv);
	

	var fsym = 'DAI';
	
	
	var priceDiv                   = document.createElement("div");
	priceDiv.className             = "ccc-header-v3-ccc-price-container";
	var elChange = '';
	var elLogo	 = '';

	if (cccCurrentTheme.General.showChangePercent)
		elChange = `
					<span
						class="ccc-header-v3-price-change"
						id="CCCHeader3ChangePctContainer_` + fsym + `_USD"
						style="color: ` + cccCurrentTheme.Trend.colorDown + `;"
					>
						(<span id="CCCHeader3ChangePct` + fsym + `_USD">-0.01 %</span>)
					</span>
		`;
	
	if (cccCurrentTheme.General.showLogo) {
		elLogo = `
			<img class="ccc-header-v3-price-logo" src="https://www.cryptocompare.com/media/37747610/dai.png" style="width: 15px; height: 15px; vertical-align: middle;"/>
		`;	
	}
		


	priceDiv.innerHTML    		   = `
									<a href="https://www.cryptocompare.com/coins/dai/overview/usd" target="_blank" rel="nofollow">
										` + elLogo + `
										<span class="ccc-header-v3-price-name">DAI: </span>
										<span class="ccc-header-v3-price-value"  style="color: ` + cccCurrentTheme.General.priceText + `;" id="CCCHeader3Price_` + fsym + `_USD" >
											$ 0.9999
										</span>
										` + elChange + `
									</a>
									`;
	embedableCoin.appendChild(priceDiv);
	
	var priceDiv                   = document.createElement("div");
	priceDiv.className             = "ccc-header-v3-ccc-price-container";
	var elChange = '';
	var elLogo	 = '';

	if (cccCurrentTheme.General.showChangePercent)
		elChange = `
					<span
						class="ccc-header-v3-price-change"
						id="CCCHeader3ChangePctContainer_` + fsym + `_EUR"
						style="color: ` + cccCurrentTheme.Trend.colorUp + `;"
					>
						(<span id="CCCHeader3ChangePct` + fsym + `_EUR">0.18 %</span>)
					</span>
		`;
	
	if (cccCurrentTheme.General.showLogo) {
		elLogo = `
			<img class="ccc-header-v3-price-logo" src="https://www.cryptocompare.com/media/37747610/dai.png" style="width: 15px; height: 15px; vertical-align: middle;"/>
		`;	
	}
		


	priceDiv.innerHTML    		   = `
									<a href="https://www.cryptocompare.com/coins/dai/overview/eur" target="_blank" rel="nofollow">
										` + elLogo + `
										<span class="ccc-header-v3-price-name">DAI: </span>
										<span class="ccc-header-v3-price-value"  style="color: ` + cccCurrentTheme.General.priceText + `;" id="CCCHeader3Price_` + fsym + `_EUR" >
											€ 0.9472
										</span>
										` + elChange + `
									</a>
									`;
	embedableCoin.appendChild(priceDiv);
	
	var priceDiv                   = document.createElement("div");
	priceDiv.className             = "ccc-header-v3-ccc-price-container";
	var elChange = '';
	var elLogo	 = '';

	if (cccCurrentTheme.General.showChangePercent)
		elChange = `
					<span
						class="ccc-header-v3-price-change"
						id="CCCHeader3ChangePctContainer_` + fsym + `_CNY"
						style="color: ` + cccCurrentTheme.Trend.colorDown + `;"
					>
						(<span id="CCCHeader3ChangePct` + fsym + `_CNY">-2.82 %</span>)
					</span>
		`;
	
	if (cccCurrentTheme.General.showLogo) {
		elLogo = `
			<img class="ccc-header-v3-price-logo" src="https://www.cryptocompare.com/media/37747610/dai.png" style="width: 15px; height: 15px; vertical-align: middle;"/>
		`;	
	}
		


	priceDiv.innerHTML    		   = `
									<a href="https://www.cryptocompare.com/coins/dai/overview/cny" target="_blank" rel="nofollow">
										` + elLogo + `
										<span class="ccc-header-v3-price-name">DAI: </span>
										<span class="ccc-header-v3-price-value"  style="color: ` + cccCurrentTheme.General.priceText + `;" id="CCCHeader3Price_` + fsym + `_CNY" >
											¥ 0.4105
										</span>
										` + elChange + `
									</a>
									`;
	embedableCoin.appendChild(priceDiv);
	
	var priceDiv                   = document.createElement("div");
	priceDiv.className             = "ccc-header-v3-ccc-price-container";
	var elChange = '';
	var elLogo	 = '';

	if (cccCurrentTheme.General.showChangePercent)
		elChange = `
					<span
						class="ccc-header-v3-price-change"
						id="CCCHeader3ChangePctContainer_` + fsym + `_GBP"
						style="color: ` + cccCurrentTheme.Trend.colorDown + `;"
					>
						(<span id="CCCHeader3ChangePct` + fsym + `_GBP">-0.22 %</span>)
					</span>
		`;
	
	if (cccCurrentTheme.General.showLogo) {
		elLogo = `
			<img class="ccc-header-v3-price-logo" src="https://www.cryptocompare.com/media/37747610/dai.png" style="width: 15px; height: 15px; vertical-align: middle;"/>
		`;	
	}
		


	priceDiv.innerHTML    		   = `
									<a href="https://www.cryptocompare.com/coins/dai/overview/gbp" target="_blank" rel="nofollow">
										` + elLogo + `
										<span class="ccc-header-v3-price-name">DAI: </span>
										<span class="ccc-header-v3-price-value"  style="color: ` + cccCurrentTheme.General.priceText + `;" id="CCCHeader3Price_` + fsym + `_GBP" >
											£ 0.7890
										</span>
										` + elChange + `
									</a>
									`;
	embedableCoin.appendChild(priceDiv);
	

	var fsym = 'DOT';
	
	
	var priceDiv                   = document.createElement("div");
	priceDiv.className             = "ccc-header-v3-ccc-price-container";
	var elChange = '';
	var elLogo	 = '';

	if (cccCurrentTheme.General.showChangePercent)
		elChange = `
					<span
						class="ccc-header-v3-price-change"
						id="CCCHeader3ChangePctContainer_` + fsym + `_USD"
						style="color: ` + cccCurrentTheme.Trend.colorUp + `;"
					>
						(<span id="CCCHeader3ChangePct` + fsym + `_USD">4.57 %</span>)
					</span>
		`;
	
	if (cccCurrentTheme.General.showLogo) {
		elLogo = `
			<img class="ccc-header-v3-price-logo" src="https://www.cryptocompare.com/media/39334571/dot.png" style="width: 15px; height: 15px; vertical-align: middle;"/>
		`;	
	}
		


	priceDiv.innerHTML    		   = `
									<a href="https://www.cryptocompare.com/coins/dot/overview/usd" target="_blank" rel="nofollow">
										` + elLogo + `
										<span class="ccc-header-v3-price-name">DOT: </span>
										<span class="ccc-header-v3-price-value"  style="color: ` + cccCurrentTheme.General.priceText + `;" id="CCCHeader3Price_` + fsym + `_USD" >
											$ 6.07
										</span>
										` + elChange + `
									</a>
									`;
	embedableCoin.appendChild(priceDiv);
	
	var priceDiv                   = document.createElement("div");
	priceDiv.className             = "ccc-header-v3-ccc-price-container";
	var elChange = '';
	var elLogo	 = '';

	if (cccCurrentTheme.General.showChangePercent)
		elChange = `
					<span
						class="ccc-header-v3-price-change"
						id="CCCHeader3ChangePctContainer_` + fsym + `_EUR"
						style="color: ` + cccCurrentTheme.Trend.colorUp + `;"
					>
						(<span id="CCCHeader3ChangePct` + fsym + `_EUR">4.67 %</span>)
					</span>
		`;
	
	if (cccCurrentTheme.General.showLogo) {
		elLogo = `
			<img class="ccc-header-v3-price-logo" src="https://www.cryptocompare.com/media/39334571/dot.png" style="width: 15px; height: 15px; vertical-align: middle;"/>
		`;	
	}
		


	priceDiv.innerHTML    		   = `
									<a href="https://www.cryptocompare.com/coins/dot/overview/eur" target="_blank" rel="nofollow">
										` + elLogo + `
										<span class="ccc-header-v3-price-name">DOT: </span>
										<span class="ccc-header-v3-price-value"  style="color: ` + cccCurrentTheme.General.priceText + `;" id="CCCHeader3Price_` + fsym + `_EUR" >
											€ 5.75
										</span>
										` + elChange + `
									</a>
									`;
	embedableCoin.appendChild(priceDiv);
	
	var priceDiv                   = document.createElement("div");
	priceDiv.className             = "ccc-header-v3-ccc-price-container";
	var elChange = '';
	var elLogo	 = '';

	if (cccCurrentTheme.General.showChangePercent)
		elChange = `
					<span
						class="ccc-header-v3-price-change"
						id="CCCHeader3ChangePctContainer_` + fsym + `_CNY"
						style="color: ` + cccCurrentTheme.Trend.colorUp + `;"
					>
						(<span id="CCCHeader3ChangePct` + fsym + `_CNY">1.85 %</span>)
					</span>
		`;
	
	if (cccCurrentTheme.General.showLogo) {
		elLogo = `
			<img class="ccc-header-v3-price-logo" src="https://www.cryptocompare.com/media/39334571/dot.png" style="width: 15px; height: 15px; vertical-align: middle;"/>
		`;	
	}
		


	priceDiv.innerHTML    		   = `
									<a href="https://www.cryptocompare.com/coins/dot/overview/cny" target="_blank" rel="nofollow">
										` + elLogo + `
										<span class="ccc-header-v3-price-name">DOT: </span>
										<span class="ccc-header-v3-price-value"  style="color: ` + cccCurrentTheme.General.priceText + `;" id="CCCHeader3Price_` + fsym + `_CNY" >
											¥ 2.50
										</span>
										` + elChange + `
									</a>
									`;
	embedableCoin.appendChild(priceDiv);
	
	var priceDiv                   = document.createElement("div");
	priceDiv.className             = "ccc-header-v3-ccc-price-container";
	var elChange = '';
	var elLogo	 = '';

	if (cccCurrentTheme.General.showChangePercent)
		elChange = `
					<span
						class="ccc-header-v3-price-change"
						id="CCCHeader3ChangePctContainer_` + fsym + `_GBP"
						style="color: ` + cccCurrentTheme.Trend.colorUp + `;"
					>
						(<span id="CCCHeader3ChangePct` + fsym + `_GBP">4.25 %</span>)
					</span>
		`;
	
	if (cccCurrentTheme.General.showLogo) {
		elLogo = `
			<img class="ccc-header-v3-price-logo" src="https://www.cryptocompare.com/media/39334571/dot.png" style="width: 15px; height: 15px; vertical-align: middle;"/>
		`;	
	}
		


	priceDiv.innerHTML    		   = `
									<a href="https://www.cryptocompare.com/coins/dot/overview/gbp" target="_blank" rel="nofollow">
										` + elLogo + `
										<span class="ccc-header-v3-price-name">DOT: </span>
										<span class="ccc-header-v3-price-value"  style="color: ` + cccCurrentTheme.General.priceText + `;" id="CCCHeader3Price_` + fsym + `_GBP" >
											£ 4.79
										</span>
										` + elChange + `
									</a>
									`;
	embedableCoin.appendChild(priceDiv);
	

	var fsym = 'TRX';
	
	
	var priceDiv                   = document.createElement("div");
	priceDiv.className             = "ccc-header-v3-ccc-price-container";
	var elChange = '';
	var elLogo	 = '';

	if (cccCurrentTheme.General.showChangePercent)
		elChange = `
					<span
						class="ccc-header-v3-price-change"
						id="CCCHeader3ChangePctContainer_` + fsym + `_USD"
						style="color: ` + cccCurrentTheme.Trend.colorDown + `;"
					>
						(<span id="CCCHeader3ChangePct` + fsym + `_USD">-1.29 %</span>)
					</span>
		`;
	
	if (cccCurrentTheme.General.showLogo) {
		elLogo = `
			<img class="ccc-header-v3-price-logo" src="https://www.cryptocompare.com/media/37746879/trx.png" style="width: 15px; height: 15px; vertical-align: middle;"/>
		`;	
	}
		


	priceDiv.innerHTML    		   = `
									<a href="https://www.cryptocompare.com/coins/trx/overview/usd" target="_blank" rel="nofollow">
										` + elLogo + `
										<span class="ccc-header-v3-price-name">TRX: </span>
										<span class="ccc-header-v3-price-value"  style="color: ` + cccCurrentTheme.General.priceText + `;" id="CCCHeader3Price_` + fsym + `_USD" >
											$ 0.1987
										</span>
										` + elChange + `
									</a>
									`;
	embedableCoin.appendChild(priceDiv);
	
	var priceDiv                   = document.createElement("div");
	priceDiv.className             = "ccc-header-v3-ccc-price-container";
	var elChange = '';
	var elLogo	 = '';

	if (cccCurrentTheme.General.showChangePercent)
		elChange = `
					<span
						class="ccc-header-v3-price-change"
						id="CCCHeader3ChangePctContainer_` + fsym + `_EUR"
						style="color: ` + cccCurrentTheme.Trend.colorDown + `;"
					>
						(<span id="CCCHeader3ChangePct` + fsym + `_EUR">-1.11 %</span>)
					</span>
		`;
	
	if (cccCurrentTheme.General.showLogo) {
		elLogo = `
			<img class="ccc-header-v3-price-logo" src="https://www.cryptocompare.com/media/37746879/trx.png" style="width: 15px; height: 15px; vertical-align: middle;"/>
		`;	
	}
		


	priceDiv.innerHTML    		   = `
									<a href="https://www.cryptocompare.com/coins/trx/overview/eur" target="_blank" rel="nofollow">
										` + elLogo + `
										<span class="ccc-header-v3-price-name">TRX: </span>
										<span class="ccc-header-v3-price-value"  style="color: ` + cccCurrentTheme.General.priceText + `;" id="CCCHeader3Price_` + fsym + `_EUR" >
											€ 0.1884
										</span>
										` + elChange + `
									</a>
									`;
	embedableCoin.appendChild(priceDiv);
	
	var priceDiv                   = document.createElement("div");
	priceDiv.className             = "ccc-header-v3-ccc-price-container";
	var elChange = '';
	var elLogo	 = '';

	if (cccCurrentTheme.General.showChangePercent)
		elChange = `
					<span
						class="ccc-header-v3-price-change"
						id="CCCHeader3ChangePctContainer_` + fsym + `_CNY"
						style="color: ` + cccCurrentTheme.Trend.colorDown + `;"
					>
						(<span id="CCCHeader3ChangePct` + fsym + `_CNY">-3.69 %</span>)
					</span>
		`;
	
	if (cccCurrentTheme.General.showLogo) {
		elLogo = `
			<img class="ccc-header-v3-price-logo" src="https://www.cryptocompare.com/media/37746879/trx.png" style="width: 15px; height: 15px; vertical-align: middle;"/>
		`;	
	}
		


	priceDiv.innerHTML    		   = `
									<a href="https://www.cryptocompare.com/coins/trx/overview/cny" target="_blank" rel="nofollow">
										` + elLogo + `
										<span class="ccc-header-v3-price-name">TRX: </span>
										<span class="ccc-header-v3-price-value"  style="color: ` + cccCurrentTheme.General.priceText + `;" id="CCCHeader3Price_` + fsym + `_CNY" >
											¥ 0.08184
										</span>
										` + elChange + `
									</a>
									`;
	embedableCoin.appendChild(priceDiv);
	
	var priceDiv                   = document.createElement("div");
	priceDiv.className             = "ccc-header-v3-ccc-price-container";
	var elChange = '';
	var elLogo	 = '';

	if (cccCurrentTheme.General.showChangePercent)
		elChange = `
					<span
						class="ccc-header-v3-price-change"
						id="CCCHeader3ChangePctContainer_` + fsym + `_GBP"
						style="color: ` + cccCurrentTheme.Trend.colorDown + `;"
					>
						(<span id="CCCHeader3ChangePct` + fsym + `_GBP">-1.50 %</span>)
					</span>
		`;
	
	if (cccCurrentTheme.General.showLogo) {
		elLogo = `
			<img class="ccc-header-v3-price-logo" src="https://www.cryptocompare.com/media/37746879/trx.png" style="width: 15px; height: 15px; vertical-align: middle;"/>
		`;	
	}
		


	priceDiv.innerHTML    		   = `
									<a href="https://www.cryptocompare.com/coins/trx/overview/gbp" target="_blank" rel="nofollow">
										` + elLogo + `
										<span class="ccc-header-v3-price-name">TRX: </span>
										<span class="ccc-header-v3-price-value"  style="color: ` + cccCurrentTheme.General.priceText + `;" id="CCCHeader3Price_` + fsym + `_GBP" >
											£ 0.1570
										</span>
										` + elChange + `
									</a>
									`;
	embedableCoin.appendChild(priceDiv);
	

	var fsym = 'LTC';
	
	
	var priceDiv                   = document.createElement("div");
	priceDiv.className             = "ccc-header-v3-ccc-price-container";
	var elChange = '';
	var elLogo	 = '';

	if (cccCurrentTheme.General.showChangePercent)
		elChange = `
					<span
						class="ccc-header-v3-price-change"
						id="CCCHeader3ChangePctContainer_` + fsym + `_USD"
						style="color: ` + cccCurrentTheme.Trend.colorUp + `;"
					>
						(<span id="CCCHeader3ChangePct` + fsym + `_USD">1.00 %</span>)
					</span>
		`;
	
	if (cccCurrentTheme.General.showLogo) {
		elLogo = `
			<img class="ccc-header-v3-price-logo" src="https://www.cryptocompare.com/media/37746243/ltc.png" style="width: 15px; height: 15px; vertical-align: middle;"/>
		`;	
	}
		


	priceDiv.innerHTML    		   = `
									<a href="https://www.cryptocompare.com/coins/ltc/overview/usd" target="_blank" rel="nofollow">
										` + elLogo + `
										<span class="ccc-header-v3-price-name">LTC: </span>
										<span class="ccc-header-v3-price-value"  style="color: ` + cccCurrentTheme.General.priceText + `;" id="CCCHeader3Price_` + fsym + `_USD" >
											$ 87.71
										</span>
										` + elChange + `
									</a>
									`;
	embedableCoin.appendChild(priceDiv);
	
	var priceDiv                   = document.createElement("div");
	priceDiv.className             = "ccc-header-v3-ccc-price-container";
	var elChange = '';
	var elLogo	 = '';

	if (cccCurrentTheme.General.showChangePercent)
		elChange = `
					<span
						class="ccc-header-v3-price-change"
						id="CCCHeader3ChangePctContainer_` + fsym + `_EUR"
						style="color: ` + cccCurrentTheme.Trend.colorUp + `;"
					>
						(<span id="CCCHeader3ChangePct` + fsym + `_EUR">1.22 %</span>)
					</span>
		`;
	
	if (cccCurrentTheme.General.showLogo) {
		elLogo = `
			<img class="ccc-header-v3-price-logo" src="https://www.cryptocompare.com/media/37746243/ltc.png" style="width: 15px; height: 15px; vertical-align: middle;"/>
		`;	
	}
		


	priceDiv.innerHTML    		   = `
									<a href="https://www.cryptocompare.com/coins/ltc/overview/eur" target="_blank" rel="nofollow">
										` + elLogo + `
										<span class="ccc-header-v3-price-name">LTC: </span>
										<span class="ccc-header-v3-price-value"  style="color: ` + cccCurrentTheme.General.priceText + `;" id="CCCHeader3Price_` + fsym + `_EUR" >
											€ 83.07
										</span>
										` + elChange + `
									</a>
									`;
	embedableCoin.appendChild(priceDiv);
	
	var priceDiv                   = document.createElement("div");
	priceDiv.className             = "ccc-header-v3-ccc-price-container";
	var elChange = '';
	var elLogo	 = '';

	if (cccCurrentTheme.General.showChangePercent)
		elChange = `
					<span
						class="ccc-header-v3-price-change"
						id="CCCHeader3ChangePctContainer_` + fsym + `_CNY"
						style="color: ` + cccCurrentTheme.Trend.colorDown + `;"
					>
						(<span id="CCCHeader3ChangePct` + fsym + `_CNY">-1.76 %</span>)
					</span>
		`;
	
	if (cccCurrentTheme.General.showLogo) {
		elLogo = `
			<img class="ccc-header-v3-price-logo" src="https://www.cryptocompare.com/media/37746243/ltc.png" style="width: 15px; height: 15px; vertical-align: middle;"/>
		`;	
	}
		


	priceDiv.innerHTML    		   = `
									<a href="https://www.cryptocompare.com/coins/ltc/overview/cny" target="_blank" rel="nofollow">
										` + elLogo + `
										<span class="ccc-header-v3-price-name">LTC: </span>
										<span class="ccc-header-v3-price-value"  style="color: ` + cccCurrentTheme.General.priceText + `;" id="CCCHeader3Price_` + fsym + `_CNY" >
											¥ 36.00
										</span>
										` + elChange + `
									</a>
									`;
	embedableCoin.appendChild(priceDiv);
	
	var priceDiv                   = document.createElement("div");
	priceDiv.className             = "ccc-header-v3-ccc-price-container";
	var elChange = '';
	var elLogo	 = '';

	if (cccCurrentTheme.General.showChangePercent)
		elChange = `
					<span
						class="ccc-header-v3-price-change"
						id="CCCHeader3ChangePctContainer_` + fsym + `_GBP"
						style="color: ` + cccCurrentTheme.Trend.colorUp + `;"
					>
						(<span id="CCCHeader3ChangePct` + fsym + `_GBP">0.82 %</span>)
					</span>
		`;
	
	if (cccCurrentTheme.General.showLogo) {
		elLogo = `
			<img class="ccc-header-v3-price-logo" src="https://www.cryptocompare.com/media/37746243/ltc.png" style="width: 15px; height: 15px; vertical-align: middle;"/>
		`;	
	}
		


	priceDiv.innerHTML    		   = `
									<a href="https://www.cryptocompare.com/coins/ltc/overview/gbp" target="_blank" rel="nofollow">
										` + elLogo + `
										<span class="ccc-header-v3-price-name">LTC: </span>
										<span class="ccc-header-v3-price-value"  style="color: ` + cccCurrentTheme.General.priceText + `;" id="CCCHeader3Price_` + fsym + `_GBP" >
											£ 69.20
										</span>
										` + elChange + `
									</a>
									`;
	embedableCoin.appendChild(priceDiv);
	

	var fsym = 'SHIB';
	
	
	var priceDiv                   = document.createElement("div");
	priceDiv.className             = "ccc-header-v3-ccc-price-container";
	var elChange = '';
	var elLogo	 = '';

	if (cccCurrentTheme.General.showChangePercent)
		elChange = `
					<span
						class="ccc-header-v3-price-change"
						id="CCCHeader3ChangePctContainer_` + fsym + `_USD"
						style="color: ` + cccCurrentTheme.Trend.colorDown + `;"
					>
						(<span id="CCCHeader3ChangePct` + fsym + `_USD">-1.37 %</span>)
					</span>
		`;
	
	if (cccCurrentTheme.General.showLogo) {
		elLogo = `
			<img class="ccc-header-v3-price-logo" src="https://www.cryptocompare.com/media/37747199/shib.png" style="width: 15px; height: 15px; vertical-align: middle;"/>
		`;	
	}
		


	priceDiv.innerHTML    		   = `
									<a href="https://www.cryptocompare.com/coins/shib/overview/usd" target="_blank" rel="nofollow">
										` + elLogo + `
										<span class="ccc-header-v3-price-name">SHIB: </span>
										<span class="ccc-header-v3-price-value"  style="color: ` + cccCurrentTheme.General.priceText + `;" id="CCCHeader3Price_` + fsym + `_USD" >
											$ 0.00002469
										</span>
										` + elChange + `
									</a>
									`;
	embedableCoin.appendChild(priceDiv);
	
	var priceDiv                   = document.createElement("div");
	priceDiv.className             = "ccc-header-v3-ccc-price-container";
	var elChange = '';
	var elLogo	 = '';

	if (cccCurrentTheme.General.showChangePercent)
		elChange = `
					<span
						class="ccc-header-v3-price-change"
						id="CCCHeader3ChangePctContainer_` + fsym + `_EUR"
						style="color: ` + cccCurrentTheme.Trend.colorDown + `;"
					>
						(<span id="CCCHeader3ChangePct` + fsym + `_EUR">-1.07 %</span>)
					</span>
		`;
	
	if (cccCurrentTheme.General.showLogo) {
		elLogo = `
			<img class="ccc-header-v3-price-logo" src="https://www.cryptocompare.com/media/37747199/shib.png" style="width: 15px; height: 15px; vertical-align: middle;"/>
		`;	
	}
		


	priceDiv.innerHTML    		   = `
									<a href="https://www.cryptocompare.com/coins/shib/overview/eur" target="_blank" rel="nofollow">
										` + elLogo + `
										<span class="ccc-header-v3-price-name">SHIB: </span>
										<span class="ccc-header-v3-price-value"  style="color: ` + cccCurrentTheme.General.priceText + `;" id="CCCHeader3Price_` + fsym + `_EUR" >
											€ 0.00002341
										</span>
										` + elChange + `
									</a>
									`;
	embedableCoin.appendChild(priceDiv);
	
	var priceDiv                   = document.createElement("div");
	priceDiv.className             = "ccc-header-v3-ccc-price-container";
	var elChange = '';
	var elLogo	 = '';

	if (cccCurrentTheme.General.showChangePercent)
		elChange = `
					<span
						class="ccc-header-v3-price-change"
						id="CCCHeader3ChangePctContainer_` + fsym + `_CNY"
						style="color: ` + cccCurrentTheme.Trend.colorDown + `;"
					>
						(<span id="CCCHeader3ChangePct` + fsym + `_CNY">-3.70 %</span>)
					</span>
		`;
	
	if (cccCurrentTheme.General.showLogo) {
		elLogo = `
			<img class="ccc-header-v3-price-logo" src="https://www.cryptocompare.com/media/37747199/shib.png" style="width: 15px; height: 15px; vertical-align: middle;"/>
		`;	
	}
		


	priceDiv.innerHTML    		   = `
									<a href="https://www.cryptocompare.com/coins/shib/overview/cny" target="_blank" rel="nofollow">
										` + elLogo + `
										<span class="ccc-header-v3-price-name">SHIB: </span>
										<span class="ccc-header-v3-price-value"  style="color: ` + cccCurrentTheme.General.priceText + `;" id="CCCHeader3Price_` + fsym + `_CNY" >
											¥ 0.00001009
										</span>
										` + elChange + `
									</a>
									`;
	embedableCoin.appendChild(priceDiv);
	
	var priceDiv                   = document.createElement("div");
	priceDiv.className             = "ccc-header-v3-ccc-price-container";
	var elChange = '';
	var elLogo	 = '';

	if (cccCurrentTheme.General.showChangePercent)
		elChange = `
					<span
						class="ccc-header-v3-price-change"
						id="CCCHeader3ChangePctContainer_` + fsym + `_GBP"
						style="color: ` + cccCurrentTheme.Trend.colorDown + `;"
					>
						(<span id="CCCHeader3ChangePct` + fsym + `_GBP">-1.46 %</span>)
					</span>
		`;
	
	if (cccCurrentTheme.General.showLogo) {
		elLogo = `
			<img class="ccc-header-v3-price-logo" src="https://www.cryptocompare.com/media/37747199/shib.png" style="width: 15px; height: 15px; vertical-align: middle;"/>
		`;	
	}
		


	priceDiv.innerHTML    		   = `
									<a href="https://www.cryptocompare.com/coins/shib/overview/gbp" target="_blank" rel="nofollow">
										` + elLogo + `
										<span class="ccc-header-v3-price-name">SHIB: </span>
										<span class="ccc-header-v3-price-value"  style="color: ` + cccCurrentTheme.General.priceText + `;" id="CCCHeader3Price_` + fsym + `_GBP" >
											£ 0.00001950
										</span>
										` + elChange + `
									</a>
									`;
	embedableCoin.appendChild(priceDiv);
	

	var fsym = 'SOL';
	
	
	var priceDiv                   = document.createElement("div");
	priceDiv.className             = "ccc-header-v3-ccc-price-container";
	var elChange = '';
	var elLogo	 = '';

	if (cccCurrentTheme.General.showChangePercent)
		elChange = `
					<span
						class="ccc-header-v3-price-change"
						id="CCCHeader3ChangePctContainer_` + fsym + `_USD"
						style="color: ` + cccCurrentTheme.Trend.colorUp + `;"
					>
						(<span id="CCCHeader3ChangePct` + fsym + `_USD">0.52 %</span>)
					</span>
		`;
	
	if (cccCurrentTheme.General.showLogo) {
		elLogo = `
			<img class="ccc-header-v3-price-logo" src="https://www.cryptocompare.com/media/37747734/sol.png" style="width: 15px; height: 15px; vertical-align: middle;"/>
		`;	
	}
		


	priceDiv.innerHTML    		   = `
									<a href="https://www.cryptocompare.com/coins/sol/overview/usd" target="_blank" rel="nofollow">
										` + elLogo + `
										<span class="ccc-header-v3-price-name">SOL: </span>
										<span class="ccc-header-v3-price-value"  style="color: ` + cccCurrentTheme.General.priceText + `;" id="CCCHeader3Price_` + fsym + `_USD" >
											$ 240.93
										</span>
										` + elChange + `
									</a>
									`;
	embedableCoin.appendChild(priceDiv);
	
	var priceDiv                   = document.createElement("div");
	priceDiv.className             = "ccc-header-v3-ccc-price-container";
	var elChange = '';
	var elLogo	 = '';

	if (cccCurrentTheme.General.showChangePercent)
		elChange = `
					<span
						class="ccc-header-v3-price-change"
						id="CCCHeader3ChangePctContainer_` + fsym + `_EUR"
						style="color: ` + cccCurrentTheme.Trend.colorUp + `;"
					>
						(<span id="CCCHeader3ChangePct` + fsym + `_EUR">0.74 %</span>)
					</span>
		`;
	
	if (cccCurrentTheme.General.showLogo) {
		elLogo = `
			<img class="ccc-header-v3-price-logo" src="https://www.cryptocompare.com/media/37747734/sol.png" style="width: 15px; height: 15px; vertical-align: middle;"/>
		`;	
	}
		


	priceDiv.innerHTML    		   = `
									<a href="https://www.cryptocompare.com/coins/sol/overview/eur" target="_blank" rel="nofollow">
										` + elLogo + `
										<span class="ccc-header-v3-price-name">SOL: </span>
										<span class="ccc-header-v3-price-value"  style="color: ` + cccCurrentTheme.General.priceText + `;" id="CCCHeader3Price_` + fsym + `_EUR" >
											€ 228.28
										</span>
										` + elChange + `
									</a>
									`;
	embedableCoin.appendChild(priceDiv);
	
	var priceDiv                   = document.createElement("div");
	priceDiv.className             = "ccc-header-v3-ccc-price-container";
	var elChange = '';
	var elLogo	 = '';

	if (cccCurrentTheme.General.showChangePercent)
		elChange = `
					<span
						class="ccc-header-v3-price-change"
						id="CCCHeader3ChangePctContainer_` + fsym + `_CNY"
						style="color: ` + cccCurrentTheme.Trend.colorDown + `;"
					>
						(<span id="CCCHeader3ChangePct` + fsym + `_CNY">-2.31 %</span>)
					</span>
		`;
	
	if (cccCurrentTheme.General.showLogo) {
		elLogo = `
			<img class="ccc-header-v3-price-logo" src="https://www.cryptocompare.com/media/37747734/sol.png" style="width: 15px; height: 15px; vertical-align: middle;"/>
		`;	
	}
		


	priceDiv.innerHTML    		   = `
									<a href="https://www.cryptocompare.com/coins/sol/overview/cny" target="_blank" rel="nofollow">
										` + elLogo + `
										<span class="ccc-header-v3-price-name">SOL: </span>
										<span class="ccc-header-v3-price-value"  style="color: ` + cccCurrentTheme.General.priceText + `;" id="CCCHeader3Price_` + fsym + `_CNY" >
											¥ 98.85
										</span>
										` + elChange + `
									</a>
									`;
	embedableCoin.appendChild(priceDiv);
	
	var priceDiv                   = document.createElement("div");
	priceDiv.className             = "ccc-header-v3-ccc-price-container";
	var elChange = '';
	var elLogo	 = '';

	if (cccCurrentTheme.General.showChangePercent)
		elChange = `
					<span
						class="ccc-header-v3-price-change"
						id="CCCHeader3ChangePctContainer_` + fsym + `_GBP"
						style="color: ` + cccCurrentTheme.Trend.colorUp + `;"
					>
						(<span id="CCCHeader3ChangePct` + fsym + `_GBP">0.33 %</span>)
					</span>
		`;
	
	if (cccCurrentTheme.General.showLogo) {
		elLogo = `
			<img class="ccc-header-v3-price-logo" src="https://www.cryptocompare.com/media/37747734/sol.png" style="width: 15px; height: 15px; vertical-align: middle;"/>
		`;	
	}
		


	priceDiv.innerHTML    		   = `
									<a href="https://www.cryptocompare.com/coins/sol/overview/gbp" target="_blank" rel="nofollow">
										` + elLogo + `
										<span class="ccc-header-v3-price-name">SOL: </span>
										<span class="ccc-header-v3-price-value"  style="color: ` + cccCurrentTheme.General.priceText + `;" id="CCCHeader3Price_` + fsym + `_GBP" >
											£ 190.05
										</span>
										` + elChange + `
									</a>
									`;
	embedableCoin.appendChild(priceDiv);
	

	var fsym = 'UNI';
	
	
	var priceDiv                   = document.createElement("div");
	priceDiv.className             = "ccc-header-v3-ccc-price-container";
	var elChange = '';
	var elLogo	 = '';

	if (cccCurrentTheme.General.showChangePercent)
		elChange = `
					<span
						class="ccc-header-v3-price-change"
						id="CCCHeader3ChangePctContainer_` + fsym + `_USD"
						style="color: ` + cccCurrentTheme.Trend.colorDown + `;"
					>
						(<span id="CCCHeader3ChangePct` + fsym + `_USD">-1.37 %</span>)
					</span>
		`;
	
	if (cccCurrentTheme.General.showLogo) {
		elLogo = `
			<img class="ccc-header-v3-price-logo" src="https://www.cryptocompare.com/media/37746885/uni.png" style="width: 15px; height: 15px; vertical-align: middle;"/>
		`;	
	}
		


	priceDiv.innerHTML    		   = `
									<a href="https://www.cryptocompare.com/coins/uni/overview/usd" target="_blank" rel="nofollow">
										` + elLogo + `
										<span class="ccc-header-v3-price-name">UNI: </span>
										<span class="ccc-header-v3-price-value"  style="color: ` + cccCurrentTheme.General.priceText + `;" id="CCCHeader3Price_` + fsym + `_USD" >
											$ 9.14
										</span>
										` + elChange + `
									</a>
									`;
	embedableCoin.appendChild(priceDiv);
	
	var priceDiv                   = document.createElement("div");
	priceDiv.className             = "ccc-header-v3-ccc-price-container";
	var elChange = '';
	var elLogo	 = '';

	if (cccCurrentTheme.General.showChangePercent)
		elChange = `
					<span
						class="ccc-header-v3-price-change"
						id="CCCHeader3ChangePctContainer_` + fsym + `_EUR"
						style="color: ` + cccCurrentTheme.Trend.colorDown + `;"
					>
						(<span id="CCCHeader3ChangePct` + fsym + `_EUR">-1.12 %</span>)
					</span>
		`;
	
	if (cccCurrentTheme.General.showLogo) {
		elLogo = `
			<img class="ccc-header-v3-price-logo" src="https://www.cryptocompare.com/media/37746885/uni.png" style="width: 15px; height: 15px; vertical-align: middle;"/>
		`;	
	}
		


	priceDiv.innerHTML    		   = `
									<a href="https://www.cryptocompare.com/coins/uni/overview/eur" target="_blank" rel="nofollow">
										` + elLogo + `
										<span class="ccc-header-v3-price-name">UNI: </span>
										<span class="ccc-header-v3-price-value"  style="color: ` + cccCurrentTheme.General.priceText + `;" id="CCCHeader3Price_` + fsym + `_EUR" >
											€ 8.66
										</span>
										` + elChange + `
									</a>
									`;
	embedableCoin.appendChild(priceDiv);
	
	var priceDiv                   = document.createElement("div");
	priceDiv.className             = "ccc-header-v3-ccc-price-container";
	var elChange = '';
	var elLogo	 = '';

	if (cccCurrentTheme.General.showChangePercent)
		elChange = `
					<span
						class="ccc-header-v3-price-change"
						id="CCCHeader3ChangePctContainer_` + fsym + `_CNY"
						style="color: ` + cccCurrentTheme.Trend.colorDown + `;"
					>
						(<span id="CCCHeader3ChangePct` + fsym + `_CNY">-4.17 %</span>)
					</span>
		`;
	
	if (cccCurrentTheme.General.showLogo) {
		elLogo = `
			<img class="ccc-header-v3-price-logo" src="https://www.cryptocompare.com/media/37746885/uni.png" style="width: 15px; height: 15px; vertical-align: middle;"/>
		`;	
	}
		


	priceDiv.innerHTML    		   = `
									<a href="https://www.cryptocompare.com/coins/uni/overview/cny" target="_blank" rel="nofollow">
										` + elLogo + `
										<span class="ccc-header-v3-price-name">UNI: </span>
										<span class="ccc-header-v3-price-value"  style="color: ` + cccCurrentTheme.General.priceText + `;" id="CCCHeader3Price_` + fsym + `_CNY" >
											¥ 3.75
										</span>
										` + elChange + `
									</a>
									`;
	embedableCoin.appendChild(priceDiv);
	
	var priceDiv                   = document.createElement("div");
	priceDiv.className             = "ccc-header-v3-ccc-price-container";
	var elChange = '';
	var elLogo	 = '';

	if (cccCurrentTheme.General.showChangePercent)
		elChange = `
					<span
						class="ccc-header-v3-price-change"
						id="CCCHeader3ChangePctContainer_` + fsym + `_GBP"
						style="color: ` + cccCurrentTheme.Trend.colorDown + `;"
					>
						(<span id="CCCHeader3ChangePct` + fsym + `_GBP">-1.51 %</span>)
					</span>
		`;
	
	if (cccCurrentTheme.General.showLogo) {
		elLogo = `
			<img class="ccc-header-v3-price-logo" src="https://www.cryptocompare.com/media/37746885/uni.png" style="width: 15px; height: 15px; vertical-align: middle;"/>
		`;	
	}
		


	priceDiv.innerHTML    		   = `
									<a href="https://www.cryptocompare.com/coins/uni/overview/gbp" target="_blank" rel="nofollow">
										` + elLogo + `
										<span class="ccc-header-v3-price-name">UNI: </span>
										<span class="ccc-header-v3-price-value"  style="color: ` + cccCurrentTheme.General.priceText + `;" id="CCCHeader3Price_` + fsym + `_GBP" >
											£ 7.21
										</span>
										` + elChange + `
									</a>
									`;
	embedableCoin.appendChild(priceDiv);
	

	var fsym = 'AVAX';
	
	
	var priceDiv                   = document.createElement("div");
	priceDiv.className             = "ccc-header-v3-ccc-price-container";
	var elChange = '';
	var elLogo	 = '';

	if (cccCurrentTheme.General.showChangePercent)
		elChange = `
					<span
						class="ccc-header-v3-price-change"
						id="CCCHeader3ChangePctContainer_` + fsym + `_USD"
						style="color: ` + cccCurrentTheme.Trend.colorUp + `;"
					>
						(<span id="CCCHeader3ChangePct` + fsym + `_USD">3.90 %</span>)
					</span>
		`;
	
	if (cccCurrentTheme.General.showLogo) {
		elLogo = `
			<img class="ccc-header-v3-price-logo" src="https://www.cryptocompare.com/media/43977160/avax.png" style="width: 15px; height: 15px; vertical-align: middle;"/>
		`;	
	}
		


	priceDiv.innerHTML    		   = `
									<a href="https://www.cryptocompare.com/coins/avax/overview/usd" target="_blank" rel="nofollow">
										` + elLogo + `
										<span class="ccc-header-v3-price-name">AVAX: </span>
										<span class="ccc-header-v3-price-value"  style="color: ` + cccCurrentTheme.General.priceText + `;" id="CCCHeader3Price_` + fsym + `_USD" >
											$ 35.42
										</span>
										` + elChange + `
									</a>
									`;
	embedableCoin.appendChild(priceDiv);
	
	var priceDiv                   = document.createElement("div");
	priceDiv.className             = "ccc-header-v3-ccc-price-container";
	var elChange = '';
	var elLogo	 = '';

	if (cccCurrentTheme.General.showChangePercent)
		elChange = `
					<span
						class="ccc-header-v3-price-change"
						id="CCCHeader3ChangePctContainer_` + fsym + `_EUR"
						style="color: ` + cccCurrentTheme.Trend.colorUp + `;"
					>
						(<span id="CCCHeader3ChangePct` + fsym + `_EUR">4.12 %</span>)
					</span>
		`;
	
	if (cccCurrentTheme.General.showLogo) {
		elLogo = `
			<img class="ccc-header-v3-price-logo" src="https://www.cryptocompare.com/media/43977160/avax.png" style="width: 15px; height: 15px; vertical-align: middle;"/>
		`;	
	}
		


	priceDiv.innerHTML    		   = `
									<a href="https://www.cryptocompare.com/coins/avax/overview/eur" target="_blank" rel="nofollow">
										` + elLogo + `
										<span class="ccc-header-v3-price-name">AVAX: </span>
										<span class="ccc-header-v3-price-value"  style="color: ` + cccCurrentTheme.General.priceText + `;" id="CCCHeader3Price_` + fsym + `_EUR" >
											€ 33.58
										</span>
										` + elChange + `
									</a>
									`;
	embedableCoin.appendChild(priceDiv);
	
	var priceDiv                   = document.createElement("div");
	priceDiv.className             = "ccc-header-v3-ccc-price-container";
	var elChange = '';
	var elLogo	 = '';

	if (cccCurrentTheme.General.showChangePercent)
		elChange = `
					<span
						class="ccc-header-v3-price-change"
						id="CCCHeader3ChangePctContainer_` + fsym + `_CNY"
						style="color: ` + cccCurrentTheme.Trend.colorUp + `;"
					>
						(<span id="CCCHeader3ChangePct` + fsym + `_CNY">1.05 %</span>)
					</span>
		`;
	
	if (cccCurrentTheme.General.showLogo) {
		elLogo = `
			<img class="ccc-header-v3-price-logo" src="https://www.cryptocompare.com/media/43977160/avax.png" style="width: 15px; height: 15px; vertical-align: middle;"/>
		`;	
	}
		


	priceDiv.innerHTML    		   = `
									<a href="https://www.cryptocompare.com/coins/avax/overview/cny" target="_blank" rel="nofollow">
										` + elLogo + `
										<span class="ccc-header-v3-price-name">AVAX: </span>
										<span class="ccc-header-v3-price-value"  style="color: ` + cccCurrentTheme.General.priceText + `;" id="CCCHeader3Price_` + fsym + `_CNY" >
											¥ 14.54
										</span>
										` + elChange + `
									</a>
									`;
	embedableCoin.appendChild(priceDiv);
	
	var priceDiv                   = document.createElement("div");
	priceDiv.className             = "ccc-header-v3-ccc-price-container";
	var elChange = '';
	var elLogo	 = '';

	if (cccCurrentTheme.General.showChangePercent)
		elChange = `
					<span
						class="ccc-header-v3-price-change"
						id="CCCHeader3ChangePctContainer_` + fsym + `_GBP"
						style="color: ` + cccCurrentTheme.Trend.colorUp + `;"
					>
						(<span id="CCCHeader3ChangePct` + fsym + `_GBP">3.71 %</span>)
					</span>
		`;
	
	if (cccCurrentTheme.General.showLogo) {
		elLogo = `
			<img class="ccc-header-v3-price-logo" src="https://www.cryptocompare.com/media/43977160/avax.png" style="width: 15px; height: 15px; vertical-align: middle;"/>
		`;	
	}
		


	priceDiv.innerHTML    		   = `
									<a href="https://www.cryptocompare.com/coins/avax/overview/gbp" target="_blank" rel="nofollow">
										` + elLogo + `
										<span class="ccc-header-v3-price-name">AVAX: </span>
										<span class="ccc-header-v3-price-value"  style="color: ` + cccCurrentTheme.General.priceText + `;" id="CCCHeader3Price_` + fsym + `_GBP" >
											£ 27.97
										</span>
										` + elChange + `
									</a>
									`;
	embedableCoin.appendChild(priceDiv);
	

	var fsym = 'LINK';
	
	
	var priceDiv                   = document.createElement("div");
	priceDiv.className             = "ccc-header-v3-ccc-price-container";
	var elChange = '';
	var elLogo	 = '';

	if (cccCurrentTheme.General.showChangePercent)
		elChange = `
					<span
						class="ccc-header-v3-price-change"
						id="CCCHeader3ChangePctContainer_` + fsym + `_USD"
						style="color: ` + cccCurrentTheme.Trend.colorUp + `;"
					>
						(<span id="CCCHeader3ChangePct` + fsym + `_USD">3.66 %</span>)
					</span>
		`;
	
	if (cccCurrentTheme.General.showLogo) {
		elLogo = `
			<img class="ccc-header-v3-price-logo" src="https://www.cryptocompare.com/media/37746242/link.png" style="width: 15px; height: 15px; vertical-align: middle;"/>
		`;	
	}
		


	priceDiv.innerHTML    		   = `
									<a href="https://www.cryptocompare.com/coins/link/overview/usd" target="_blank" rel="nofollow">
										` + elLogo + `
										<span class="ccc-header-v3-price-name">LINK: </span>
										<span class="ccc-header-v3-price-value"  style="color: ` + cccCurrentTheme.General.priceText + `;" id="CCCHeader3Price_` + fsym + `_USD" >
											$ 15.24
										</span>
										` + elChange + `
									</a>
									`;
	embedableCoin.appendChild(priceDiv);
	
	var priceDiv                   = document.createElement("div");
	priceDiv.className             = "ccc-header-v3-ccc-price-container";
	var elChange = '';
	var elLogo	 = '';

	if (cccCurrentTheme.General.showChangePercent)
		elChange = `
					<span
						class="ccc-header-v3-price-change"
						id="CCCHeader3ChangePctContainer_` + fsym + `_EUR"
						style="color: ` + cccCurrentTheme.Trend.colorUp + `;"
					>
						(<span id="CCCHeader3ChangePct` + fsym + `_EUR">3.88 %</span>)
					</span>
		`;
	
	if (cccCurrentTheme.General.showLogo) {
		elLogo = `
			<img class="ccc-header-v3-price-logo" src="https://www.cryptocompare.com/media/37746242/link.png" style="width: 15px; height: 15px; vertical-align: middle;"/>
		`;	
	}
		


	priceDiv.innerHTML    		   = `
									<a href="https://www.cryptocompare.com/coins/link/overview/eur" target="_blank" rel="nofollow">
										` + elLogo + `
										<span class="ccc-header-v3-price-name">LINK: </span>
										<span class="ccc-header-v3-price-value"  style="color: ` + cccCurrentTheme.General.priceText + `;" id="CCCHeader3Price_` + fsym + `_EUR" >
											€ 14.43
										</span>
										` + elChange + `
									</a>
									`;
	embedableCoin.appendChild(priceDiv);
	
	var priceDiv                   = document.createElement("div");
	priceDiv.className             = "ccc-header-v3-ccc-price-container";
	var elChange = '';
	var elLogo	 = '';

	if (cccCurrentTheme.General.showChangePercent)
		elChange = `
					<span
						class="ccc-header-v3-price-change"
						id="CCCHeader3ChangePctContainer_` + fsym + `_CNY"
						style="color: ` + cccCurrentTheme.Trend.colorUp + `;"
					>
						(<span id="CCCHeader3ChangePct` + fsym + `_CNY">1.08 %</span>)
					</span>
		`;
	
	if (cccCurrentTheme.General.showLogo) {
		elLogo = `
			<img class="ccc-header-v3-price-logo" src="https://www.cryptocompare.com/media/37746242/link.png" style="width: 15px; height: 15px; vertical-align: middle;"/>
		`;	
	}
		


	priceDiv.innerHTML    		   = `
									<a href="https://www.cryptocompare.com/coins/link/overview/cny" target="_blank" rel="nofollow">
										` + elLogo + `
										<span class="ccc-header-v3-price-name">LINK: </span>
										<span class="ccc-header-v3-price-value"  style="color: ` + cccCurrentTheme.General.priceText + `;" id="CCCHeader3Price_` + fsym + `_CNY" >
											¥ 6.27
										</span>
										` + elChange + `
									</a>
									`;
	embedableCoin.appendChild(priceDiv);
	
	var priceDiv                   = document.createElement("div");
	priceDiv.className             = "ccc-header-v3-ccc-price-container";
	var elChange = '';
	var elLogo	 = '';

	if (cccCurrentTheme.General.showChangePercent)
		elChange = `
					<span
						class="ccc-header-v3-price-change"
						id="CCCHeader3ChangePctContainer_` + fsym + `_GBP"
						style="color: ` + cccCurrentTheme.Trend.colorUp + `;"
					>
						(<span id="CCCHeader3ChangePct` + fsym + `_GBP">3.46 %</span>)
					</span>
		`;
	
	if (cccCurrentTheme.General.showLogo) {
		elLogo = `
			<img class="ccc-header-v3-price-logo" src="https://www.cryptocompare.com/media/37746242/link.png" style="width: 15px; height: 15px; vertical-align: middle;"/>
		`;	
	}
		


	priceDiv.innerHTML    		   = `
									<a href="https://www.cryptocompare.com/coins/link/overview/gbp" target="_blank" rel="nofollow">
										` + elLogo + `
										<span class="ccc-header-v3-price-name">LINK: </span>
										<span class="ccc-header-v3-price-value"  style="color: ` + cccCurrentTheme.General.priceText + `;" id="CCCHeader3Price_` + fsym + `_GBP" >
											£ 12.02
										</span>
										` + elChange + `
									</a>
									`;
	embedableCoin.appendChild(priceDiv);
	

	var fsym = 'XMR';
	
	
	var priceDiv                   = document.createElement("div");
	priceDiv.className             = "ccc-header-v3-ccc-price-container";
	var elChange = '';
	var elLogo	 = '';

	if (cccCurrentTheme.General.showChangePercent)
		elChange = `
					<span
						class="ccc-header-v3-price-change"
						id="CCCHeader3ChangePctContainer_` + fsym + `_USD"
						style="color: ` + cccCurrentTheme.Trend.colorUp + `;"
					>
						(<span id="CCCHeader3ChangePct` + fsym + `_USD">0.39 %</span>)
					</span>
		`;
	
	if (cccCurrentTheme.General.showLogo) {
		elLogo = `
			<img class="ccc-header-v3-price-logo" src="https://www.cryptocompare.com/media/37746883/xmr.png" style="width: 15px; height: 15px; vertical-align: middle;"/>
		`;	
	}
		


	priceDiv.innerHTML    		   = `
									<a href="https://www.cryptocompare.com/coins/xmr/overview/usd" target="_blank" rel="nofollow">
										` + elLogo + `
										<span class="ccc-header-v3-price-name">XMR: </span>
										<span class="ccc-header-v3-price-value"  style="color: ` + cccCurrentTheme.General.priceText + `;" id="CCCHeader3Price_` + fsym + `_USD" >
											$ 159.29
										</span>
										` + elChange + `
									</a>
									`;
	embedableCoin.appendChild(priceDiv);
	
	var priceDiv                   = document.createElement("div");
	priceDiv.className             = "ccc-header-v3-ccc-price-container";
	var elChange = '';
	var elLogo	 = '';

	if (cccCurrentTheme.General.showChangePercent)
		elChange = `
					<span
						class="ccc-header-v3-price-change"
						id="CCCHeader3ChangePctContainer_` + fsym + `_EUR"
						style="color: ` + cccCurrentTheme.Trend.colorUp + `;"
					>
						(<span id="CCCHeader3ChangePct` + fsym + `_EUR">0.60 %</span>)
					</span>
		`;
	
	if (cccCurrentTheme.General.showLogo) {
		elLogo = `
			<img class="ccc-header-v3-price-logo" src="https://www.cryptocompare.com/media/37746883/xmr.png" style="width: 15px; height: 15px; vertical-align: middle;"/>
		`;	
	}
		


	priceDiv.innerHTML    		   = `
									<a href="https://www.cryptocompare.com/coins/xmr/overview/eur" target="_blank" rel="nofollow">
										` + elLogo + `
										<span class="ccc-header-v3-price-name">XMR: </span>
										<span class="ccc-header-v3-price-value"  style="color: ` + cccCurrentTheme.General.priceText + `;" id="CCCHeader3Price_` + fsym + `_EUR" >
											€ 150.95
										</span>
										` + elChange + `
									</a>
									`;
	embedableCoin.appendChild(priceDiv);
	
	var priceDiv                   = document.createElement("div");
	priceDiv.className             = "ccc-header-v3-ccc-price-container";
	var elChange = '';
	var elLogo	 = '';

	if (cccCurrentTheme.General.showChangePercent)
		elChange = `
					<span
						class="ccc-header-v3-price-change"
						id="CCCHeader3ChangePctContainer_` + fsym + `_CNY"
						style="color: ` + cccCurrentTheme.Trend.colorDown + `;"
					>
						(<span id="CCCHeader3ChangePct` + fsym + `_CNY">-2.11 %</span>)
					</span>
		`;
	
	if (cccCurrentTheme.General.showLogo) {
		elLogo = `
			<img class="ccc-header-v3-price-logo" src="https://www.cryptocompare.com/media/37746883/xmr.png" style="width: 15px; height: 15px; vertical-align: middle;"/>
		`;	
	}
		


	priceDiv.innerHTML    		   = `
									<a href="https://www.cryptocompare.com/coins/xmr/overview/cny" target="_blank" rel="nofollow">
										` + elLogo + `
										<span class="ccc-header-v3-price-name">XMR: </span>
										<span class="ccc-header-v3-price-value"  style="color: ` + cccCurrentTheme.General.priceText + `;" id="CCCHeader3Price_` + fsym + `_CNY" >
											¥ 65.51
										</span>
										` + elChange + `
									</a>
									`;
	embedableCoin.appendChild(priceDiv);
	
	var priceDiv                   = document.createElement("div");
	priceDiv.className             = "ccc-header-v3-ccc-price-container";
	var elChange = '';
	var elLogo	 = '';

	if (cccCurrentTheme.General.showChangePercent)
		elChange = `
					<span
						class="ccc-header-v3-price-change"
						id="CCCHeader3ChangePctContainer_` + fsym + `_GBP"
						style="color: ` + cccCurrentTheme.Trend.colorUp + `;"
					>
						(<span id="CCCHeader3ChangePct` + fsym + `_GBP">0.20 %</span>)
					</span>
		`;
	
	if (cccCurrentTheme.General.showLogo) {
		elLogo = `
			<img class="ccc-header-v3-price-logo" src="https://www.cryptocompare.com/media/37746883/xmr.png" style="width: 15px; height: 15px; vertical-align: middle;"/>
		`;	
	}
		


	priceDiv.innerHTML    		   = `
									<a href="https://www.cryptocompare.com/coins/xmr/overview/gbp" target="_blank" rel="nofollow">
										` + elLogo + `
										<span class="ccc-header-v3-price-name">XMR: </span>
										<span class="ccc-header-v3-price-value"  style="color: ` + cccCurrentTheme.General.priceText + `;" id="CCCHeader3Price_` + fsym + `_GBP" >
											£ 125.74
										</span>
										` + elChange + `
									</a>
									`;
	embedableCoin.appendChild(priceDiv);
	

	var fsym = 'ATOM';
	
	
	var priceDiv                   = document.createElement("div");
	priceDiv.className             = "ccc-header-v3-ccc-price-container";
	var elChange = '';
	var elLogo	 = '';

	if (cccCurrentTheme.General.showChangePercent)
		elChange = `
					<span
						class="ccc-header-v3-price-change"
						id="CCCHeader3ChangePctContainer_` + fsym + `_USD"
						style="color: ` + cccCurrentTheme.Trend.colorUp + `;"
					>
						(<span id="CCCHeader3ChangePct` + fsym + `_USD">5.07 %</span>)
					</span>
		`;
	
	if (cccCurrentTheme.General.showLogo) {
		elLogo = `
			<img class="ccc-header-v3-price-logo" src="https://www.cryptocompare.com/media/37746867/atom.png" style="width: 15px; height: 15px; vertical-align: middle;"/>
		`;	
	}
		


	priceDiv.innerHTML    		   = `
									<a href="https://www.cryptocompare.com/coins/atom/overview/usd" target="_blank" rel="nofollow">
										` + elLogo + `
										<span class="ccc-header-v3-price-name">ATOM: </span>
										<span class="ccc-header-v3-price-value"  style="color: ` + cccCurrentTheme.General.priceText + `;" id="CCCHeader3Price_` + fsym + `_USD" >
											$ 6.57
										</span>
										` + elChange + `
									</a>
									`;
	embedableCoin.appendChild(priceDiv);
	
	var priceDiv                   = document.createElement("div");
	priceDiv.className             = "ccc-header-v3-ccc-price-container";
	var elChange = '';
	var elLogo	 = '';

	if (cccCurrentTheme.General.showChangePercent)
		elChange = `
					<span
						class="ccc-header-v3-price-change"
						id="CCCHeader3ChangePctContainer_` + fsym + `_EUR"
						style="color: ` + cccCurrentTheme.Trend.colorUp + `;"
					>
						(<span id="CCCHeader3ChangePct` + fsym + `_EUR">5.30 %</span>)
					</span>
		`;
	
	if (cccCurrentTheme.General.showLogo) {
		elLogo = `
			<img class="ccc-header-v3-price-logo" src="https://www.cryptocompare.com/media/37746867/atom.png" style="width: 15px; height: 15px; vertical-align: middle;"/>
		`;	
	}
		


	priceDiv.innerHTML    		   = `
									<a href="https://www.cryptocompare.com/coins/atom/overview/eur" target="_blank" rel="nofollow">
										` + elLogo + `
										<span class="ccc-header-v3-price-name">ATOM: </span>
										<span class="ccc-header-v3-price-value"  style="color: ` + cccCurrentTheme.General.priceText + `;" id="CCCHeader3Price_` + fsym + `_EUR" >
											€ 6.22
										</span>
										` + elChange + `
									</a>
									`;
	embedableCoin.appendChild(priceDiv);
	
	var priceDiv                   = document.createElement("div");
	priceDiv.className             = "ccc-header-v3-ccc-price-container";
	var elChange = '';
	var elLogo	 = '';

	if (cccCurrentTheme.General.showChangePercent)
		elChange = `
					<span
						class="ccc-header-v3-price-change"
						id="CCCHeader3ChangePctContainer_` + fsym + `_CNY"
						style="color: ` + cccCurrentTheme.Trend.colorUp + `;"
					>
						(<span id="CCCHeader3ChangePct` + fsym + `_CNY">2.20 %</span>)
					</span>
		`;
	
	if (cccCurrentTheme.General.showLogo) {
		elLogo = `
			<img class="ccc-header-v3-price-logo" src="https://www.cryptocompare.com/media/37746867/atom.png" style="width: 15px; height: 15px; vertical-align: middle;"/>
		`;	
	}
		


	priceDiv.innerHTML    		   = `
									<a href="https://www.cryptocompare.com/coins/atom/overview/cny" target="_blank" rel="nofollow">
										` + elLogo + `
										<span class="ccc-header-v3-price-name">ATOM: </span>
										<span class="ccc-header-v3-price-value"  style="color: ` + cccCurrentTheme.General.priceText + `;" id="CCCHeader3Price_` + fsym + `_CNY" >
											¥ 2.69
										</span>
										` + elChange + `
									</a>
									`;
	embedableCoin.appendChild(priceDiv);
	
	var priceDiv                   = document.createElement("div");
	priceDiv.className             = "ccc-header-v3-ccc-price-container";
	var elChange = '';
	var elLogo	 = '';

	if (cccCurrentTheme.General.showChangePercent)
		elChange = `
					<span
						class="ccc-header-v3-price-change"
						id="CCCHeader3ChangePctContainer_` + fsym + `_GBP"
						style="color: ` + cccCurrentTheme.Trend.colorUp + `;"
					>
						(<span id="CCCHeader3ChangePct` + fsym + `_GBP">4.88 %</span>)
					</span>
		`;
	
	if (cccCurrentTheme.General.showLogo) {
		elLogo = `
			<img class="ccc-header-v3-price-logo" src="https://www.cryptocompare.com/media/37746867/atom.png" style="width: 15px; height: 15px; vertical-align: middle;"/>
		`;	
	}
		


	priceDiv.innerHTML    		   = `
									<a href="https://www.cryptocompare.com/coins/atom/overview/gbp" target="_blank" rel="nofollow">
										` + elLogo + `
										<span class="ccc-header-v3-price-name">ATOM: </span>
										<span class="ccc-header-v3-price-value"  style="color: ` + cccCurrentTheme.General.priceText + `;" id="CCCHeader3Price_` + fsym + `_GBP" >
											£ 5.18
										</span>
										` + elChange + `
									</a>
									`;
	embedableCoin.appendChild(priceDiv);
	

	var fsym = 'ETC';
	
	
	var priceDiv                   = document.createElement("div");
	priceDiv.className             = "ccc-header-v3-ccc-price-container";
	var elChange = '';
	var elLogo	 = '';

	if (cccCurrentTheme.General.showChangePercent)
		elChange = `
					<span
						class="ccc-header-v3-price-change"
						id="CCCHeader3ChangePctContainer_` + fsym + `_USD"
						style="color: ` + cccCurrentTheme.Trend.colorUp + `;"
					>
						(<span id="CCCHeader3ChangePct` + fsym + `_USD">1.76 %</span>)
					</span>
		`;
	
	if (cccCurrentTheme.General.showLogo) {
		elLogo = `
			<img class="ccc-header-v3-price-logo" src="https://www.cryptocompare.com/media/37746862/etc.png" style="width: 15px; height: 15px; vertical-align: middle;"/>
		`;	
	}
		


	priceDiv.innerHTML    		   = `
									<a href="https://www.cryptocompare.com/coins/etc/overview/usd" target="_blank" rel="nofollow">
										` + elLogo + `
										<span class="ccc-header-v3-price-name">ETC: </span>
										<span class="ccc-header-v3-price-value"  style="color: ` + cccCurrentTheme.General.priceText + `;" id="CCCHeader3Price_` + fsym + `_USD" >
											$ 26.49
										</span>
										` + elChange + `
									</a>
									`;
	embedableCoin.appendChild(priceDiv);
	
	var priceDiv                   = document.createElement("div");
	priceDiv.className             = "ccc-header-v3-ccc-price-container";
	var elChange = '';
	var elLogo	 = '';

	if (cccCurrentTheme.General.showChangePercent)
		elChange = `
					<span
						class="ccc-header-v3-price-change"
						id="CCCHeader3ChangePctContainer_` + fsym + `_EUR"
						style="color: ` + cccCurrentTheme.Trend.colorUp + `;"
					>
						(<span id="CCCHeader3ChangePct` + fsym + `_EUR">1.98 %</span>)
					</span>
		`;
	
	if (cccCurrentTheme.General.showLogo) {
		elLogo = `
			<img class="ccc-header-v3-price-logo" src="https://www.cryptocompare.com/media/37746862/etc.png" style="width: 15px; height: 15px; vertical-align: middle;"/>
		`;	
	}
		


	priceDiv.innerHTML    		   = `
									<a href="https://www.cryptocompare.com/coins/etc/overview/eur" target="_blank" rel="nofollow">
										` + elLogo + `
										<span class="ccc-header-v3-price-name">ETC: </span>
										<span class="ccc-header-v3-price-value"  style="color: ` + cccCurrentTheme.General.priceText + `;" id="CCCHeader3Price_` + fsym + `_EUR" >
											€ 25.10
										</span>
										` + elChange + `
									</a>
									`;
	embedableCoin.appendChild(priceDiv);
	
	var priceDiv                   = document.createElement("div");
	priceDiv.className             = "ccc-header-v3-ccc-price-container";
	var elChange = '';
	var elLogo	 = '';

	if (cccCurrentTheme.General.showChangePercent)
		elChange = `
					<span
						class="ccc-header-v3-price-change"
						id="CCCHeader3ChangePctContainer_` + fsym + `_CNY"
						style="color: ` + cccCurrentTheme.Trend.colorUp + `;"
					>
						(<span id="CCCHeader3ChangePct` + fsym + `_CNY">0.00 %</span>)
					</span>
		`;
	
	if (cccCurrentTheme.General.showLogo) {
		elLogo = `
			<img class="ccc-header-v3-price-logo" src="https://www.cryptocompare.com/media/37746862/etc.png" style="width: 15px; height: 15px; vertical-align: middle;"/>
		`;	
	}
		


	priceDiv.innerHTML    		   = `
									<a href="https://www.cryptocompare.com/coins/etc/overview/cny" target="_blank" rel="nofollow">
										` + elLogo + `
										<span class="ccc-header-v3-price-name">ETC: </span>
										<span class="ccc-header-v3-price-value"  style="color: ` + cccCurrentTheme.General.priceText + `;" id="CCCHeader3Price_` + fsym + `_CNY" >
											¥ 65.60
										</span>
										` + elChange + `
									</a>
									`;
	embedableCoin.appendChild(priceDiv);
	
	var priceDiv                   = document.createElement("div");
	priceDiv.className             = "ccc-header-v3-ccc-price-container";
	var elChange = '';
	var elLogo	 = '';

	if (cccCurrentTheme.General.showChangePercent)
		elChange = `
					<span
						class="ccc-header-v3-price-change"
						id="CCCHeader3ChangePctContainer_` + fsym + `_GBP"
						style="color: ` + cccCurrentTheme.Trend.colorUp + `;"
					>
						(<span id="CCCHeader3ChangePct` + fsym + `_GBP">1.57 %</span>)
					</span>
		`;
	
	if (cccCurrentTheme.General.showLogo) {
		elLogo = `
			<img class="ccc-header-v3-price-logo" src="https://www.cryptocompare.com/media/37746862/etc.png" style="width: 15px; height: 15px; vertical-align: middle;"/>
		`;	
	}
		


	priceDiv.innerHTML    		   = `
									<a href="https://www.cryptocompare.com/coins/etc/overview/gbp" target="_blank" rel="nofollow">
										` + elLogo + `
										<span class="ccc-header-v3-price-name">ETC: </span>
										<span class="ccc-header-v3-price-value"  style="color: ` + cccCurrentTheme.General.priceText + `;" id="CCCHeader3Price_` + fsym + `_GBP" >
											£ 20.91
										</span>
										` + elChange + `
									</a>
									`;
	embedableCoin.appendChild(priceDiv);
	


inner.appendChild(embedableCoin);
embedable.appendChild(inner);

embedableCoin.appendChild(style);
document.currentScript.parentNode.appendChild(embedable);
var cccHeaderV3RefreshDataInterval = setInterval(cccRefreshHeaderV3DataHeader, 30000);


if (cccCurrentTheme.General.enableMarquee) {
	new scrollIfNeeded(embedableCoin);
}