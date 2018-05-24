export class DomUtils {
  public static readonly NUMBER_KEYS = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 96, 97, 98, 99, 100, 101, 102,
    103, 104, 105];
  public static readonly TAB_KEY = 9;
  public static readonly RETURN_KEY = 13;

  public static setUpInteractions() {
    setTimeout(function() {
      let form = document.getElementById("time_schedule_form");
      let timeFrames = form.querySelectorAll(".tf_wrapper");

      // Prevent form submission when pressing return
      form.onkeyup = function (e) {
        if (e.which === DomUtils.RETURN_KEY) {
          e.preventDefault();
        }
      };

      for (let i = 0; i < timeFrames.length; i++) {
        let timePickers = timeFrames[i].querySelectorAll(".tp_wrapper");
        for (let j = 0; j < timePickers.length; j++) {
          let timePicker = timePickers[j];
          let hoursControl = timePicker.querySelector(".ngb-tp-hour"), minutesControl = timePicker.querySelector(".ngb-tp-minute");
          let hoursField = hoursControl.querySelector("input[type='text']") as HTMLElement,
            minutesField = minutesControl.querySelector("input[type='text']") as HTMLElement;

          // Select value on focus
          selectOnFocus(timePicker);

          // Move to next mins field after 2 digits in hours
          hoursField.onkeyup = function (e) {
            if (DomUtils.NUMBER_KEYS.indexOf(e.keyCode) !== -1) {
              if (hoursField['value'].length === 2) {
                minutesField.focus();
              }
            }
          };

          // Move to next mins field on tab
          hoursField.onkeydown = function (e) {
            if (e.keyCode === DomUtils.TAB_KEY) {
              e.preventDefault();
              minutesField.focus();
            }
          };

          // Move to next hours input field on tab
          minutesField.onkeydown = function (e) {
            if (e.which === DomUtils.TAB_KEY) {
              e.preventDefault();
              let nextField = minutesField;
              let nextPicker = (j === timePickers.length - 1) ? null : timePickers[j + 1];
              if (nextPicker) {
                nextField = nextPicker.querySelector(".ngb-tp-hour input[type='text']") as HTMLElement;
              } else {
                let nextTimeFrame = (i === timeFrames.length - 1) ? null : timeFrames[i + 1];
                if (nextTimeFrame) {
                  nextField = nextTimeFrame.querySelector("ngb-timepicker input[type='text']") as HTMLElement;
                }
              }
              nextField.focus();
            }
          };

          // Move to next hours input field after 2 digits in mins
          let endTimePicker = (j === timePickers.length - 1) ? null : timePickers[j + 1];
          if (endTimePicker) {
            minutesField.onkeyup = function (e) {
              if (DomUtils.NUMBER_KEYS.indexOf(e.keyCode) !== -1) {
                if (minutesField['value'].length === 2) {
                  (<HTMLElement>endTimePicker.querySelector(".ngb-tp-hour input[type='text']")).focus();
                }
              }
            };
          }
        }
      }
      emitPostInitEvent();
    }, 500);

    function selectOnFocus(tp) {
      let inputs = tp.querySelectorAll("input[type='text']");
      for (let i = 0; i < inputs.length; i++) {
        inputs[i]['onfocus'] = function() { this.select(); };
      }
    }

    function emitPostInitEvent() {
      let event = document.createEvent('Event');
      event.initEvent('apidate:refresh', true, true);
      document.getElementById("time_schedule_form").dispatchEvent(event);
    }
  }
}
