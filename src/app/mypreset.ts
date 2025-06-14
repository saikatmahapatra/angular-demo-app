//mypreset.ts
import { definePreset } from '@primeng/themes';
import Aura from '@primeng/themes/aura';
// import Material from '@primeng/themes/material';
// import Lara from '@primeng/themes/lara';
// import Nora from '@primeng/themes/nora';

const MyPreset = definePreset(Aura, {
  primitive:{},
  semantic: {
    primary: {
      50: '{blue.50}',
      100: '{blue.100}',
      200: '{blue.200}',
      300: '{blue.300}',
      400: '{blue.400}',
      500: '#1976d2',
      600: '{blue.600}',
      700: '{blue.700}',
      800: '{blue.800}',
      900: '{blue.900}',
      950: '{blue.950}',
    },
    colorScheme: {
      light: {
        surface: {
          0: '#ffffff',
          50: '{zinc.50}',
          100: '{zinc.100}',
          200: '{zinc.200}',
          300: '{zinc.300}',
          400: '{zinc.400}',
          500: '{zinc.500}',
          600: '{zinc.600}',
          700: '{zinc.700}',
          800: '{zinc.800}',
          900: '{zinc.900}',
          950: '{zinc.950}',
        },
      },
      dark: {
        surface: {
          0: '#ffffff',
          50: '{slate.50}',
          100: '{slate.100}',
          200: '{slate.200}',
          300: '{slate.300}',
          400: '{slate.400}',
          500: '{slate.500}',
          600: '{slate.600}',
          700: '{slate.700}',
          800: '{slate.800}',
          900: '{slate.900}',
          950: '{slate.950}',
        },
      },
    },
    focusRing: {
      width: '2px',
      style: 'dashed',
      color: '{primary.color}',
      offset: '1px',
    },
    components: {
      card: {
        colorScheme: {
          light: {
            root: {
              background: '{surface.0}',
              color: '{surface.700}',
            },
            subtitle: {
              color: '{surface.500}',
            },
          },
          dark: {
            root: {
              background: '{surface.900}',
              color: '{surface.0}',
            },
            subtitle: {
              color: '{surface.400}',
            },
          },
        },
      },
    },
  },
});

export default MyPreset;
