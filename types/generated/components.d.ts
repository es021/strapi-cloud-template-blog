import type { Schema, Struct } from '@strapi/strapi';

export interface SalePricingTreatment extends Struct.ComponentSchema {
  collectionName: 'components_sale_pricing_treatments';
  info: {
    displayName: 'Pricing Treatment';
    icon: 'tag';
  };
  attributes: {
    ea_monthly: Schema.Attribute.Enumeration<
      ['normal', '10pct_off', '20pct_off', '30pct_off', '50pct_off', 'hidden']
    > &
      Schema.Attribute.DefaultTo<'normal'>;
    ea_yearly: Schema.Attribute.Enumeration<
      ['normal', '10pct_off', '20pct_off', '30pct_off', '50pct_off', 'hidden']
    > &
      Schema.Attribute.DefaultTo<'normal'>;
    free_trial: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    lifetime: Schema.Attribute.Enumeration<
      ['normal', '10pct_off', '20pct_off', '30pct_off', '50pct_off', 'hidden']
    > &
      Schema.Attribute.DefaultTo<'normal'>;
    standard_monthly: Schema.Attribute.Enumeration<
      ['normal', '10pct_off', '20pct_off', '30pct_off', '50pct_off', 'hidden']
    > &
      Schema.Attribute.DefaultTo<'normal'>;
    standard_yearly: Schema.Attribute.Enumeration<
      ['normal', '10pct_off', '20pct_off', '30pct_off', '50pct_off', 'hidden']
    > &
      Schema.Attribute.DefaultTo<'normal'>;
  };
}

export interface SaleStyle extends Struct.ComponentSchema {
  collectionName: 'components_sale_styles';
  info: {
    displayName: 'Style';
    icon: 'paint-brush';
  };
  attributes: {
    bg_image: Schema.Attribute.String;
    bg_image_mobile: Schema.Attribute.String;
    description_en: Schema.Attribute.Text;
    description_es: Schema.Attribute.Text;
    description_ja: Schema.Attribute.Text;
    fg_image: Schema.Attribute.String;
    fg_image_mobile: Schema.Attribute.String;
    header_text_en: Schema.Attribute.String & Schema.Attribute.Required;
    header_text_es: Schema.Attribute.String;
    header_text_ja: Schema.Attribute.String;
    max_popups_per_user_per_day: Schema.Attribute.Decimal;
    popup_delay_seconds: Schema.Attribute.Integer &
      Schema.Attribute.DefaultTo<5>;
    promo_code: Schema.Attribute.String;
  };
}

export interface SharedMedia extends Struct.ComponentSchema {
  collectionName: 'components_shared_media';
  info: {
    displayName: 'Media';
    icon: 'file-video';
  };
  attributes: {
    file: Schema.Attribute.Media<'images' | 'files' | 'videos'>;
  };
}

export interface SharedQuote extends Struct.ComponentSchema {
  collectionName: 'components_shared_quotes';
  info: {
    displayName: 'Quote';
    icon: 'indent';
  };
  attributes: {
    body: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SharedRichText extends Struct.ComponentSchema {
  collectionName: 'components_shared_rich_texts';
  info: {
    description: '';
    displayName: 'Rich text';
    icon: 'align-justify';
  };
  attributes: {
    body: Schema.Attribute.RichText;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: '';
    displayName: 'Seo';
    icon: 'allergies';
    name: 'Seo';
  };
  attributes: {
    metaDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    metaTitle: Schema.Attribute.String & Schema.Attribute.Required;
    shareImage: Schema.Attribute.Media<'images'>;
  };
}

export interface SharedSlider extends Struct.ComponentSchema {
  collectionName: 'components_shared_sliders';
  info: {
    description: '';
    displayName: 'Slider';
    icon: 'address-book';
  };
  attributes: {
    files: Schema.Attribute.Media<'images', true>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'sale.pricing-treatment': SalePricingTreatment;
      'sale.style': SaleStyle;
      'shared.media': SharedMedia;
      'shared.quote': SharedQuote;
      'shared.rich-text': SharedRichText;
      'shared.seo': SharedSeo;
      'shared.slider': SharedSlider;
    }
  }
}
