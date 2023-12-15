import { useRouter } from 'next/router'
import languageDetector from '../lib/languageDetector'
import { useEffect, useRef, useState } from 'react';
import expandIcon from '@/assets/expand.svg'
import { useTranslation } from 'react-i18next';
import languageIcon from '@/assets/language.svg'
import styles from '@/styles/Dropdown.module.css'
import Image from 'next/image'

interface LanguageSwitchDropdownProps {
  locales: string[]
}

const lanMap = new Map([
  ['en', 'English'],
  ['ar', 'عربي'],
])

export const LanguageSwitchDropdown = (props: LanguageSwitchDropdownProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const router = useRouter();
  const { locales, } = props
  const dropdownRef = useRef<any>(null);
  const { t } = useTranslation('common')

  const handleSelectChange = (selectedLocale: string) => {
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

    setIsOpen(!isOpen)

    router.push(href);
  };

  const onExpand = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <div className='xy-start h100' ref={dropdownRef} onClick={onExpand}>
      <Image src={languageIcon} alt="language" width={20} height={20} />

      <span className='p-xy-1 cursor'>
        {t('locale-lan')}
      </span>

      <div className={styles.dropdown}>
        <Image src={expandIcon} alt='expand' />
        <div>
          {isOpen && (
            <div className={styles.dropdownList}>
              {locales?.map((locale) => (
                <div key={locale} onClick={() => handleSelectChange(locale)} className={styles.option}>
                  {lanMap.get(locale)}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
