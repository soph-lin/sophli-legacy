const modalContainer = document.getElementById('modal-container');
modalContainer.style.display = 'none'; // Necessary since CSS style isn't recognized, only style made in JS

const modalHeader = document.getElementById('modal-header');
const modalFooter = document.getElementById('modal-footer');
const modalMessage = document.getElementById('modal-message');

var modalData;

function setupModalContainer(data) {
    modalData = data;
    toggleModalContainer();
}

function toggleModalContainer() {
    if (modalContainer.style.display === 'none' && modalData) {
        modalMessage.innerText = modalData.message;
        if (modalData.title) modalHeader.innerText = modalData.title;
        else modalHeader.innerText = '';
        addModalButtons();
        modalContainer.style.display = `block`;
    }
    else closeModal();
}

function closeModal() {
    modalContainer.style.display = "none";
    modalHeader.innerText = "";
    modalMessage.innerText = "";
    modalData = null;
    removeAllChildElements(modalFooter);
}

function addModalButtons() {
    var buttons;
    if (modalData.type === "y/n" && modalData.actionY) {
        buttons = [
        {
            label: "Yes",
            styleClass: "btn-primary",
            action: modalData.actionY ? modalData.actionY : function() {
                return;
            }
        },
        {
            label: "No",
            styleClass: "btn-secondary",
            action: modalData.actionN ? modalData.actionN : function() {
                return;
            }
            }
        ]
    }
    else {
        buttons = [
        {
            label: "OK 👍",
            styleClass: "btn-primary",
            action: closeModal
        }]
    }

  // Add buttons
  buttons.forEach(function(button) {
    const btn = document.createElement("button");
    btn.innerText = button.label;
    btn.classList.add(button.styleClass);
    btn.onclick = function() {
      button.action();
      closeModal();
    };
    modalFooter.appendChild(btn);
  });
}


/*

Example usage (from one of my previous projects DogHouse)

function handleClearData() {
    modalData = {
        message: "are you sure you want to clear data? it can't be recovered again...",
        type: 'y/n',
        actionY: function () {
            clearData();
            window.location.href = '/';
        }
    };

    setupModalContainer(modalData);
}
*/