'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  CarouselSlide, Package, TextBlock, Coupon, Testimonial, FareRule,
  defaultCarousel, defaultPackages, defaultTextBlocks, defaultCoupons,
  defaultTestimonials, defaultFareRules
} from '@/lib/siteData';

interface SiteStore {
  carousel: CarouselSlide[];
  packages: Package[];
  textBlocks: TextBlock[];
  coupons: Coupon[];
  testimonials: Testimonial[];
  fareRules: FareRule[];
  isAdminLoggedIn: boolean;

  // Auth
  login: (username: string, password: string) => boolean;
  logout: () => void;

  // Carousel
  updateSlide: (id: string, data: Partial<CarouselSlide>) => void;
  addSlide: (slide: CarouselSlide) => void;
  removeSlide: (id: string) => void;

  // Packages
  updatePackage: (id: string, data: Partial<Package>) => void;
  addPackage: (pkg: Package) => void;
  removePackage: (id: string) => void;

  // Text Blocks
  updateTextBlock: (id: string, data: Partial<TextBlock>) => void;
  addTextBlock: (block: TextBlock) => void;
  removeTextBlock: (id: string) => void;

  // Coupons
  updateCoupon: (code: string, data: Partial<Coupon>) => void;
  addCoupon: (coupon: Coupon) => void;
  removeCoupon: (code: string) => void;
  validateCoupon: (code: string, amount: number) => { valid: boolean; discount: number; message: string };

  // Reset
  resetToDefaults: () => void;
}

export const useSiteStore = create<SiteStore>()(
  persist(
    (set, get) => ({
      carousel: defaultCarousel,
      packages: defaultPackages,
      textBlocks: defaultTextBlocks,
      coupons: defaultCoupons,
      testimonials: defaultTestimonials,
      fareRules: defaultFareRules,
      isAdminLoggedIn: false,

      login: (username, password) => {
        if (username === 'rashmi_admin' && password === 'Rashmi@2024!') {
          set({ isAdminLoggedIn: true });
          return true;
        }
        return false;
      },
      logout: () => set({ isAdminLoggedIn: false }),

      updateSlide: (id, data) =>
        set(s => ({ carousel: s.carousel.map(c => c.id === id ? { ...c, ...data } : c) })),
      addSlide: (slide) => set(s => ({ carousel: [...s.carousel, slide] })),
      removeSlide: (id) => set(s => ({ carousel: s.carousel.filter(c => c.id !== id) })),

      updatePackage: (id, data) =>
        set(s => ({ packages: s.packages.map(p => p.id === id ? { ...p, ...data } : p) })),
      addPackage: (pkg) => set(s => ({ packages: [...s.packages, pkg] })),
      removePackage: (id) => set(s => ({ packages: s.packages.filter(p => p.id !== id) })),

      updateTextBlock: (id, data) =>
        set(s => ({ textBlocks: s.textBlocks.map(t => t.id === id ? { ...t, ...data } : t) })),
      addTextBlock: (block) => set(s => ({ textBlocks: [...s.textBlocks, block] })),
      removeTextBlock: (id) => set(s => ({ textBlocks: s.textBlocks.filter(t => t.id !== id) })),

      updateCoupon: (code, data) =>
        set(s => ({ coupons: s.coupons.map(c => c.code === code ? { ...c, ...data } : c) })),
      addCoupon: (coupon) => set(s => ({ coupons: [...s.coupons, coupon] })),
      removeCoupon: (code) => set(s => ({ coupons: s.coupons.filter(c => c.code !== code) })),

      validateCoupon: (code, amount) => {
        const coupon = get().coupons.find(c => c.code.toUpperCase() === code.toUpperCase() && c.active);
        if (!coupon) return { valid: false, discount: 0, message: 'Invalid or expired coupon code.' };
        if (amount < coupon.minBooking) return { valid: false, discount: 0, message: `Minimum booking amount is ₹${coupon.minBooking}.` };
        const discount = coupon.type === 'percentage'
          ? Math.min((amount * coupon.discount) / 100, coupon.maxDiscount || Infinity)
          : coupon.discount;
        return { valid: true, discount: Math.round(discount), message: coupon.description };
      },

      resetToDefaults: () => set({
        carousel: defaultCarousel,
        packages: defaultPackages,
        textBlocks: defaultTextBlocks,
        coupons: defaultCoupons,
        testimonials: defaultTestimonials,
        fareRules: defaultFareRules,
      }),
    }),
    {
      name: 'rashmi-tours-store',
      version: 2,
      migrate: (_s: unknown) => ({
        carousel: defaultCarousel,
        packages: defaultPackages,
        textBlocks: defaultTextBlocks,
        coupons: defaultCoupons,
        testimonials: defaultTestimonials,
        fareRules: defaultFareRules,
        isAdminLoggedIn: false
      })
    }
  )
);
