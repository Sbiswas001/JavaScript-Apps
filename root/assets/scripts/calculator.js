let outputScreen = document.getElementById("output-Screen");
        function display(num) {
            outputScreen.value += num;
            return num;
        }
        function Calculate() {
            try {
                outputScreen.value = eval(outputScreen.value);
            }
            catch (err) {
                outputScreen.value = "Invalid";
            }
        }
        function Clear() {
            outputScreen.value = " ";
        }
        function del() {
            outputScreen.value = outputScreen.value.slice(0, -1);
        }