import { useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { PartnerProfileForm } from '../types/form';

const STORAGE_KEY = 'partner_profile_form';

export const useFormPersistence = (methods: UseFormReturn<PartnerProfileForm>) => {
  const { watch, reset } = methods;
  const formValues = watch();

  // Form değişikliklerini localStorage'a kaydet
  useEffect(() => {
    const saveToStorage = () => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(formValues));
      } catch (error) {
        console.error('Form verisi kaydedilemedi:', error);
      }
    };

    const debounceTimer = setTimeout(saveToStorage, 500);
    return () => clearTimeout(debounceTimer);
  }, [formValues]);

  // Sayfa yüklendiğinde localStorage'dan verileri yükle
  useEffect(() => {
    try {
      const savedData = localStorage.getItem(STORAGE_KEY);
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        reset(parsedData);
      }
    } catch (error) {
      console.error('Kaydedilmiş form verisi yüklenemedi:', error);
    }
  }, [reset]);

  // localStorage'daki verileri temizle
  const clearSavedData = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Kaydedilmiş form verisi silinemedi:', error);
    }
  };

  return {
    clearSavedData,
  };
};
