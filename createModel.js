class Industry {
  constructor(industryID, industry, logoLink, useCases, dataSources, configurations) {
    this.industryID = industryID;
    this.industry = industry;
    this.logoLink = logoLink;
    this.useCases = useCases;
    this.dataSources = dataSources;
    this.configurations = configurations;
  }
}

fetch('data.json')
  .then(response => response.json())
  .then(data => {
    const industries = data.Industries.map(industry => new Industry(
      industry.industryID,
      industry.industry,
      industry.logoLink,
      industry.useCases,
      industry.dataSources,
      industry.configurations
    ));

    const industryCardContainer = document.getElementById('industryModelContainer');

    industries.forEach(function (industry) {
      const industryElement = document.createElement('div');
      industryElement.classList.add('col-lg-4');
      industryElement.classList.add('col-md-6');
      industryElement.classList.add('industry-card');

      industryElement.innerHTML = `
        <div class="bg-white shadow-md text-dark px-5 py-3 rounded text-center border-0 pnp-industry-big-sqr mb-2">
            <span class="d-flex align-items-center justify-content-center bg-light text-gray-900 rounded-circle" style="width: 100px;height:100px">
                <img src="${industry.logoLink}" width="50"/>
            </span>
            <p class="mt-4">${industry.industry}</p>                    
        </div>
      `;

      // Attach a click event listener to the industry element
      industryElement.addEventListener('click', function () {
        showUseCases(industry);
      });

      industryCardContainer.appendChild(industryElement);
    });

    function showUseCases(industry) {
      // Clear existing use cases
      const useCasesContainer = document.getElementById('useCasesContainer');
      useCasesContainer.innerHTML = '';

      // Create and display use cases
      const useCasesElement = document.createElement('div');
      useCasesElement.classList.add('use-cases');
      useCasesElement.classList.add('row');

      industry.useCases.forEach(useCase => {
        const useCaseElement = document.createElement('div');
        useCaseElement.classList.add('col-lg-4');
        useCaseElement.classList.add('col-md-6');
        useCaseElement.classList.add('usecase-card');
        useCaseElement.innerHTML = `
          <button class=" shadow-md text-dark rounded text-center border-0 px-5 pnp-usecase-option" id=${useCase.useCaseId}>
            <p class="">${useCase.useCase}</p>
          </button>
        `;
        useCasesElement.appendChild(useCaseElement);
      });

      useCasesContainer.appendChild(useCasesElement);
    }

  })
  .catch(error => {
    console.error('Error:', error);
  });

  

$(document).ready(function () {

  $('.pnp-btn-datasource-option').click(function () {
    $('.pnp-btn-datasource-option').removeClass('pnp-btn-datasource-option-selected');
    $(this).addClass('pnp-btn-datasource-option-selected');
  });

  $('.pnp-industry-big-sqr').click(function () {
    $('.pnp-industry-big-sqr').removeClass('pnp-industry-big-sqr-selected');
    $(this).addClass('pnp-industry-big-sqr-selected');
  });


  $('.pnp-usecase-option').click(function() {
    $('.pnp-usecase-option').removeClass('pnp-usecase-option-selected');
    $(this).addClass('pnp-usecase-option-selected');
  });


  $('.pnp-container-loader').css("display", "none");
  $('.pnp-container-data-table-testing').css("display", "none");
  $('.pnp-start-button').click(function () {
    $('.pnp-container-model-process').css("display", "none");
    $('.pnp-container-loader').css("display", "flex");
    setTimeout(function () {
      $(".pnp-container-loader").css("display", "none");
      $(".pnp-container-data-table-testing").css("display", "inherit");
    }, 5000);
  });



  $('.pnp-start-training-btn').click(function () {
    $('.pnp-container-data-table-testing').css("display", "none");
    $('.pnp-create-model-training-loader').css("display", "flex");
  });
});
