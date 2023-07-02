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
      clearUseCases();

      // Create and display use cases
      const useCasesContainer = document.getElementById('useCasesContainer');
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

      $(document).ready(function() {
        $('.pnp-usecase-option').click(function() {
          $('.pnp-usecase-option').removeClass('pnp-usecase-option-selected');
          $(this).addClass('pnp-usecase-option-selected');
        });
      });

      useCasesContainer.appendChild(useCasesElement);
    }

    // Function to clear the use cases
    function clearUseCases() {
      const useCasesContainer = document.getElementById('useCasesContainer');
      useCasesContainer.innerHTML = '';
    }

    // Add an event listener to the previous button
    document.getElementById('previous').addEventListener('click', handlePreviousClick);

    // Function to handle the previous button click
    function handlePreviousClick() {
      clearUseCases();
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });

$(document).ready(function () {
  $('.pnp-industry-big-sqr').click(function () {
    $('.pnp-industry-big-sqr').removeClass('pnp-industry-big-sqr-selected');
    $(this).addClass('pnp-industry-big-sqr-selected');
  });

  $('.pnp-btn-datasource-option').click(function () {
    $('.pnp-btn-datasource-option').removeClass('pnp-btn-datasource-option-selected');
    $(this).addClass('pnp-btn-datasource-option-selected');
  });

  $('.pnp-connector-modal').click(function () {
    $('.pnp-connector-modal').removeClass('pnp-connector-modal-selected');
    $(this).addClass('pnp-connector-modal-selected');
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

$(document).ready(function(){
  var current_fs, next_fs, previous_fs; //fieldsets
  var opacity;
  var current = 1;
  var steps = $("fieldset").length;
  
  setProgressBar(current);
  
  $(".next").click(function(){
    current_fs = $(this).parent();
    next_fs = $(this).parent().next();
  
    // Add Class Active
    $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
  
    // Show the next fieldset
    next_fs.show();
  
    // Hide the current fieldset with style
    current_fs.animate({opacity: 0}, {
      step: function(now) {
        // For making fieldset appear animation
        opacity = 1 - now;
        current_fs.css({
          'display': 'none',
          'position': 'relative'
        });
        next_fs.css({'opacity': opacity});
      },
      duration: 500
    });
  
    setProgressBar(++current);
  });
  
  $(".previous").click(function(){
    current_fs = $(this).parent();
    previous_fs = $(this).parent().prev();
  
    // Remove class active
    $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");
  
    // Show the previous fieldset
    previous_fs.show();
  
    // Hide the current fieldset with style
    current_fs.animate({opacity: 0}, {
      step: function(now) {
        // For making fieldset appear animation
        opacity = 1 - now;
        current_fs.css({
          'display': 'none',
          'position': 'relative'
        });
        previous_fs.css({'opacity': opacity});
      },
      duration: 500
    });
  
    setProgressBar(--current);
  });
  
  function setProgressBar(curStep){
    var percent = parseFloat(100 / steps) * curStep;
    percent = percent.toFixed();
    $(".progress-bar").css("width",percent+"%");
  }
  
  $(".submit").click(function(){
    return false;
  });
});
