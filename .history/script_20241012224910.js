function updateHomeValue(input) {
  if (input.value < 0) input.value = 0;
  input.parentNode.nextElementSibling.textContent = '$' + input.value;
}
