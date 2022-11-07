import { defineStore } from 'pinia';
import { getDefaultClub } from 'src/models/clubModel';
import { IClub } from 'src/api/clubApi';
import { computed, provide } from 'vue';
import { getClubGraphql } from 'src/api/clubGraphql';
import { useStyleStore } from 'stores/styleStore';

const styleStore = useStyleStore();

export const useClubStore = defineStore('club', {
  state: () => {
    return {
      clubLoaded: false,
      data: getDefaultClub()
    }
  },
  getters: {
    slug: state => state.data.slug || '',
    club: state => state.data,
    clubLoaded: state => state.clubLoaded,
  },
  actions: {
    setDefault() {
      this.data = getDefaultClub();
    },
    provide() {
      provide('club', computed(() => this.$state.data));
    },
    patchWith(club: Partial<IClub>) {
      this.$patch({data: club});
    },
    async loadBySlug(slug: string | null) {
      if (slug) {
        this.setDefault();
        this.$state.data.slug = slug;

        await this.load();
      }
    },
    async load() {
      if (this.slug) {
        this.$state.clubLoaded = false;

        const result = await getClubGraphql(this.slug);
        this.patchWith(result.club);

        styleStore.patchWith(result.club.style);

        this.$state.clubLoaded = true;
      }
    }
  },
})