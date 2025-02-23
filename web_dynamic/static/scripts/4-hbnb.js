$(function () {
	const selectedAmenityIds = [];
	const selectedNames = [];
	
	$('input').change(function () {
		const isChecked = this.checked;
		const amenityId = this.dataset.id;
		const amenityName = this.dataset.name;

		if (isChecked) {
			selectedAmenityIds.push(amenityId)
			selectedNames.push(amenityName);
		} else {
			const index = selectedAmenityIds.indexOf(amenityId);
			const indexOfName = selectedNames.indexOf(amenityName);
		
			if (index > -1) {
				selectedAmenityIds.splice(index, 1);
			}

			if (indexOfName > -1) {
				selectedNames.splice(indexOfName, 1);
			}
		}

		$('.amenities h4').text(selectedNames.join(", "));		
	})

	$.ajax({
		url: 'http://localhost:5001/api/v1/status',
		method: 'GET',
		success: function (response) {

			if (response.status === 'OK') {
				$('div#api_status').addClass('available');
			} else {
				$('div#api_status').removeClass('available');
			}
		}
	})

	$.ajax({
		url: 'http://localhost:5001/api/v1/places_search/',
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: JSON.stringify({}),
		success: function (response) {
			$()
			for (const place of response) {
				$('.places').append(`
					<article>
					  	<div class="title_box">
							<h2>${place.name}</h2>
							<div class="price_by_night">$${place.price_by_night }</div>
					  	</div>
					  	<div class="information">
							<div class="max_guest">${place.max_guest} Guests</div>
								<div class="number_rooms">${place.number_rooms} Bedrooms</div>
								<div class="number_bathrooms">${place.number_bathrooms} Bathrooms</div>
					  	</div>
					  	<div class="user">

					  	</div>
						  	<div class="description">
							${place.description}
						  	</div>
					</article>`
				)
			}
		}
	})

	$('button').click(function() {
		$.ajax({
			url: 'http://localhost:5001/api/v1/places_search/',
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			data: JSON.stringify({
				amenities: selectedAmenityIds,
			}),
			success: function (response) {
				$('.places').empty()
				for (const place of response) {
					$('.places').append(`
						<article>
							  <div class="title_box">
								<h2>${place.name}</h2>
								<div class="price_by_night">$${place.price_by_night }</div>
							  </div>
							  <div class="information">
								<div class="max_guest">${place.max_guest} Guests</div>
									<div class="number_rooms">${place.number_rooms} Bedrooms</div>
									<div class="number_bathrooms">${place.number_bathrooms} Bathrooms</div>
							  </div>
							  <div class="user">
	
							  </div>
								  <div class="description">
								${place.description}
								  </div>
						</article>`
					)
				}
			}
		})
	})
});
