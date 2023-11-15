import { useRouter } from 'next/router'
import languageDetector from '../lib/languageDetector'

interface LanguageSwitchDropdownProps {
  locales: string[]
}

export const LanguageSwitchDropdown = (props: LanguageSwitchDropdownProps) => {
  const router = useRouter();
  const { locales, } = props

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLocale = event.target.value;
    languageDetector.cache && languageDetector.cache(selectedLocale);

    let href = router.asPath;
    let pName = router.pathname;

    Object.keys(router.query).forEach((k) => {
      if (k === 'locale') {
        pName = pName.replace(`[${k}]`, selectedLocale);
        return;
      }
      pName = pName.replace(`[${k}]`, router.query[k] as string);
    });

    if (selectedLocale) {
      href = pName;
      if (href.indexOf(`/${selectedLocale}`) < 0) {
        href = `/${selectedLocale}${href}`;
      }
    }

    router.push(href);
  };

  return (
    <select value={router.locale} onChange={handleSelectChange}>
      {locales?.map((locale) => (
        <option key={locale} value={locale}>
          {locale}
        </option>
      ))}
    </select>
  );
};
