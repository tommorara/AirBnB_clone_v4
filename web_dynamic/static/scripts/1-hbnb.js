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
});
