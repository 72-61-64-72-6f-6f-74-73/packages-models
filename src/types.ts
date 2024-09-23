export type IModelsQueryBindValue = string | number | boolean | null;
export type IModelsQueryBindValueTuple = [string, IModelsQueryBindValue];
export type IModelsQueryBindValueOpt = (IModelsQueryBindValue[] | null)
export type IModelsSortCreatedAt = 'newest' | 'oldest';
export type IModelsQueryParam = { query: string; bind_values: IModelsQueryBindValueOpt };
export type IModelsFormErrorTuple = [boolean, string];
export type IModelsFormValidationTuple = [RegExp, string];
export type IModelsForm = {
    label?: string;
    placeholder?: string;
    validateKeypress?: boolean;
    preventFocusRest?: boolean;
    validation: RegExp;
    charset: RegExp;
    hidden?: boolean;
    optional?: boolean;
    default?: string | number;
};

