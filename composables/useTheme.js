import { ref, onMounted } from 'vue';

export function useTheme() {
  const currentTheme = ref('light');

  const toggleTheme = () => {
    currentTheme.value = currentTheme.value === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', currentTheme.value);
    localStorage.setItem('theme', currentTheme.value);
  };


  const loadTheme = () => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    currentTheme.value = savedTheme;
    document.documentElement.setAttribute('data-theme', savedTheme);
  };

  onMounted(loadTheme);

  return { currentTheme, toggleTheme };
}