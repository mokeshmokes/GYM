import { defineField, defineType } from 'sanity';

export const packageSchema = defineType({
  name: 'package',
  title: 'Membership Packages',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Package Title / Tier Name',
      type: 'string',
      description: 'e.g. Monthly Starter, Quarterly Pro Athlete, Yearly VIP Elite',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Identifier Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'enrollValue',
      title: 'Dropdown Value / Form Code',
      type: 'string',
      description: 'Value passed to Contact form and Google Sheet leads (e.g. Quarterly Pro, Monthly Starter, Yearly VIP)',
    }),
    defineField({
      name: 'price',
      title: 'Price (with Currency)',
      type: 'string',
      description: 'Enter price amount with currency (e.g. ₹2,999 or ₹7,499). Defaults to ₹ if no symbol is typed.',
      initialValue: '₹2,999',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'period',
      title: 'Billing Period',
      type: 'string',
      description: 'e.g. / month, / quarter, / year',
      initialValue: '/ month',
    }),
    defineField({
      name: 'isPopular',
      title: 'Mark as Most Popular / Featured',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'desc',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'Short summary of who this tier is designed for.',
    }),
    defineField({
      name: 'features',
      title: 'Included / Excluded Features',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'text',
              title: 'Feature Description',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'included',
              title: 'Included in this plan?',
              type: 'boolean',
              initialValue: true,
            },
          ],
          preview: {
            select: {
              title: 'text',
              included: 'included',
            },
            prepare(selection: Record<string, any>) {
              const { title, included } = selection;
              return {
                title: `${included ? '✓' : '✗'} ${title || ''}`,
              };
            },
          },
        },
      ],
    }),
    defineField({
      name: 'buttonText',
      title: 'Call to Action Button Text',
      type: 'string',
      initialValue: 'Claim Membership',
    }),
    defineField({
      name: 'order',
      title: 'Display Order Priority',
      type: 'number',
      description: 'Lower numbers display first (e.g. 1, 2, 3)',
      initialValue: 1,
    }),
    defineField({
      name: 'isActive',
      title: 'Is Active / Visible on Website',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      price: 'price',
      amount: 'amount',
      period: 'period',
      isPopular: 'isPopular',
    },
    prepare({ title, price, amount, period, isPopular }: any) {
      const displayPrice = price
        ? (price.startsWith('₹') ? price : `₹${price}`)
        : (amount ? `₹${amount}` : '₹0');
      return {
        title: `${title || 'Untitled Package'}${isPopular ? ' ⭐ (Most Popular)' : ''}`,
        subtitle: `${displayPrice} ${period || ''}`,
      };
    },
  },
});
