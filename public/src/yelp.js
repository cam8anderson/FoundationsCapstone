//const sdk = require("api")("@yelp-developers/v1.0#2g1slo020olp6w9zbu");
//
//sdk.auth(
//  "Bearer NJ7FA560l8bS4nvQtnBUxCOkhSfPVMKvx0Z22GKxKojrtaosXOfmU3w8aHV0FDeDXZOkOdLpmFZ8AM7lyUXDIynOHq6p0j9EPPyWvCRsbe7z6nPHcHXLA7qc0fKMZXYx"
//);
//sdk
//  .v3_business_reviews({
//    limit: "10",
//    sort_by: "yelp_sort",
//    business_id_or_alias: "yBNqJRQEOPSpwhiybMQ29A",
//  })
//  .then(({ data }) => console.log(data))
//  .catch((err) => console.error(err));

//const apiKey =
//  "Bearer NJ7FA560l8bS4nvQtnBUxCOkhSfPVMKvx0Z22GKxKojrtaosXOfmU3w8aHV0FDeDXZOkOdLpmFZ8AM7lyUXDIynOHq6p0j9EPPyWvCRsbe7z6nPHcHXLA7qc0fKMZXYx";
//
//fetch(`https://api.yelp.com/v3/businesses/yBNqJRQEOPSpwhiybMQ29A/reviews`, {
//  headers: {
//    Authorization: `Bearer ${apiKey}`,
//  },
//})
//  .then((response) => response.json())
//  .then((data) => console.log(data))
//  .catch((error) => console.error(error));

async function fetchYelpReviews() {
  try {
    const response = await fetch("http://localhost:4004/yelp-api");
    const data = await response.json();
    const reviewsDiv = document.getElementById("yelp-reviews");

    const reviewsHTML = data.reviews
      .map(
        (review) => `
        <div class="reviewBox">
          <p class="reviewname">${review.user.name}</p>
          <p class="reviewtext">${review.text}</p>
          <p class="reviewrating">${review.rating} stars</p>
        </div>
      `
      )
      .join("");
    reviewsDiv.innerHTML = reviewsHTML;
  } catch (error) {
    console.error(error);
  }
}

fetchYelpReviews();
