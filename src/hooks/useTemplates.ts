import { useState, useEffect, useCallback } from 'react';
import type { Template, AssetBatch } from '@/types/template';

const TEMPLATES_STORAGE_KEY = 'massgen_templates';
const ASSETS_STORAGE_KEY = 'massgen_assets';

export function useTemplates() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(TEMPLATES_STORAGE_KEY);
    if (stored) {
      try {
        setTemplates(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse stored templates:', e);
      }
    }
    setIsLoading(false);
  }, []);

  const saveTemplates = useCallback((newTemplates: Template[]) => {
    setTemplates(newTemplates);
    localStorage.setItem(TEMPLATES_STORAGE_KEY, JSON.stringify(newTemplates));
  }, []);

  const addTemplate = useCallback((template: Template) => {
    const newTemplates = [...templates, template];
    saveTemplates(newTemplates);
    return template;
  }, [templates, saveTemplates]);

  const updateTemplate = useCallback((id: string, updates: Partial<Template>) => {
    const newTemplates = templates.map((t) =>
      t.id === id ? { ...t, ...updates, updatedAt: new Date().toISOString() } : t
    );
    saveTemplates(newTemplates);
  }, [templates, saveTemplates]);

  const deleteTemplate = useCallback((id: string) => {
    const newTemplates = templates.filter((t) => t.id !== id);
    saveTemplates(newTemplates);
  }, [templates, saveTemplates]);

  const getTemplate = useCallback((id: string) => {
    return templates.find((t) => t.id === id);
  }, [templates]);

  return {
    templates,
    isLoading,
    addTemplate,
    updateTemplate,
    deleteTemplate,
    getTemplate,
  };
}

export function useAssets() {
  const [batches, setBatches] = useState<AssetBatch[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(ASSETS_STORAGE_KEY);
    if (stored) {
      try {
        setBatches(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse stored assets:', e);
      }
    }
    setIsLoading(false);
  }, []);

  const saveBatches = useCallback((newBatches: AssetBatch[]) => {
    setBatches(newBatches);
    localStorage.setItem(ASSETS_STORAGE_KEY, JSON.stringify(newBatches));
  }, []);

  const addBatch = useCallback((batch: AssetBatch) => {
    const newBatches = [batch, ...batches];
    saveBatches(newBatches);
    return batch;
  }, [batches, saveBatches]);

  const deleteBatch = useCallback((id: string) => {
    const newBatches = batches.filter((b) => b.id !== id);
    saveBatches(newBatches);
  }, [batches, saveBatches]);

  return {
    batches,
    isLoading,
    addBatch,
    deleteBatch,
  };
}
