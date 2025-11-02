'use client';

import { useState, useCallback } from 'react';

interface ModalState {
  id: string;
  isOpen: boolean;
  stackLevel: number;
}

/**
 * Hook لإدارة تراكب النوافذ المنبثقة مع مسارات عودة واضحة
 * يدعم النوافذ المتداخلة ويوفر مؤشرات بصرية لتسلسل النوافذ
 */
export const useModalStack = () => {
  const [modals, setModals] = useState<ModalState[]>([]);

  const openModal = useCallback((id: string) => {
    setModals(prev => {
      const existingIndex = prev.findIndex(modal => modal.id === id);
      if (existingIndex !== -1) {
        // إذا كانت النافذة موجودة، قم بتحديث حالتها
        return prev.map((modal, index) => 
          index === existingIndex 
            ? { ...modal, isOpen: true }
            : modal
        );
      }
      
      // إضافة نافذة جديدة
      const stackLevel = prev.filter(modal => modal.isOpen).length;
      return [...prev, { id, isOpen: true, stackLevel }];
    });
  }, []);

  const closeModal = useCallback((id: string) => {
    setModals(prev => 
      prev.map(modal => 
        modal.id === id 
          ? { ...modal, isOpen: false }
          : modal
      )
    );
  }, []);

  const closeTopModal = useCallback(() => {
    setModals(prev => {
      const openModals = prev.filter(modal => modal.isOpen);
      if (openModals.length === 0) return prev;
      
      const topModal = openModals[openModals.length - 1];
      return prev.map(modal => 
        modal.id === topModal.id 
          ? { ...modal, isOpen: false }
          : modal
      );
    });
  }, []);

  const closeAllModals = useCallback(() => {
    setModals(prev => 
      prev.map(modal => ({ ...modal, isOpen: false }))
    );
  }, []);

  const getModalState = useCallback((id: string) => {
    return modals.find(modal => modal.id === id) || { id, isOpen: false, stackLevel: 0 };
  }, [modals]);

  const getOpenModalsCount = useCallback(() => {
    return modals.filter(modal => modal.isOpen).length;
  }, [modals]);

  return {
    openModal,
    closeModal,
    closeTopModal,
    closeAllModals,
    getModalState,
    getOpenModalsCount,
    modals: modals.filter(modal => modal.isOpen),
  };
};