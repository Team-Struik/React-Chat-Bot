import { Page, Text, View, Document, StyleSheet, Svg, Path, G } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 12,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  logo: {
    width: 120,
    height: 120,
  },
  invoiceTitle: {
    fontSize: 20,
    marginBottom: 20,
  },
  companyDetails: {
    textAlign: 'right',
  },
  section: {
    marginBottom: 20,
    textAlign: 'right',
  },
  table: {
    marginBottom: 20,
  },
  tableHeader: {
    display: 'flex',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    borderBottomStyle: 'solid',
    paddingBottom: 5,
    marginBottom: 10,
  },
  tableRow: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 5,
  },
  tableColNum: {
    width: '10%',
    fontSize: 10,
    fontWeight: 'bold',
  },
  tableColDesc: {
    width: '30%',
    fontSize: 10,
    fontWeight: 'bold',
  },
  tableColQty: {
    width: '30%',
    fontSize: 10,
    fontWeight: 'bold',
  },
  tableColPrize: {
    width: '15%',
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  tableColTotal: {
    width: '15%',
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  extraInfo: {
    width: '100%',
    fontSize: 10,
    color: 'grey',
    marginTop: 5,
    padding: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    marginBottom: 10,
  },
  totalSection: {
    textAlign: 'right',
    marginTop: 20,
  },
  totalText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  footer: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    height: 60,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 10,
    textAlign: 'center',
    color: 'grey',
  }

});

const InvoicePDF = ({ invoiceData }: { invoiceData: any }) => (
  <Document>
    <Page style={styles.page}>
        <View style={styles.header}>
            <Svg style={styles.logo} width="180" height="95" viewBox="0 0 180 95" fill="none">
                <G clip-path="url(#clip0_660_1648)">
                    <Path d="M32.4004 33.3826C32.4004 28.8778 29.9612 25.1843 26.0731 23.3482C29.225 21.4267 31.2886 18.1196 31.2886 14.4325C31.2886 8.33289 25.9536 3.86865 18.6361 3.86865H0V45.1357H19.016C26.6322 45.1357 32.4004 40.0651 32.4004 33.3826ZM10.9154 12.7139H16.6579C19.0352 12.7139 20.4991 14.1635 20.4991 16.307C20.4991 18.442 19.0331 19.9002 16.6579 19.9002H10.9154V12.7139ZM10.9154 35.7994V28.2928H17.0911C19.5516 28.2928 21.1606 29.8364 21.1606 32.029C21.1606 34.2558 19.5516 35.7994 17.0911 35.7994H10.9154Z" fill="#2D2E3B"></Path>
                    <Path d="M46.2553 0H35.293V45.1335H46.2553V0Z" fill="#2D2E3B"></Path>
                    <Path d="M61.1654 13.2925H50.2031V45.1336H61.1654V13.2925Z" fill="#2D2E3B"></Path>
                    <Path d="M61.1654 0H50.2031V9.30851H61.1654V0Z" fill="#2D2E3B"></Path>
                    <Path d="M79.9729 25.1563C76.949 24.6162 74.5163 24.1934 74.5163 22.3808C74.5163 20.9034 75.6964 20.0324 77.4526 20.0324C79.4394 20.0324 80.8052 20.9782 80.8052 23.0107H91.0696C90.9437 16.5587 85.692 12.2461 77.5871 12.2461C69.4331 12.2461 63.9957 16.3645 63.9957 22.7481C63.9957 30.4703 70.5385 31.9605 75.4744 32.7611C78.5303 33.2671 80.9396 33.7902 80.9396 35.6262C80.9396 37.2723 79.4202 38.0921 77.8176 38.0921C75.7369 38.0921 74.1172 37.0247 74.1172 34.6911H63.5625C63.6628 41.5892 68.9338 46.173 77.6084 46.173C86.0676 46.173 91.68 41.8198 91.68 35.1651C91.6778 27.0949 84.9942 26.0487 79.9729 25.1563Z" fill="#2D2E3B"></Path>
                    <Path d="M163.834 80.6957H169.327V58.7524H163.834C160.633 58.7524 157.904 59.8199 155.922 61.8204C153.939 63.8209 152.906 66.5622 152.906 69.7583C152.908 76.2998 157.3 80.6957 163.834 80.6957ZM163.834 59.4997H168.58V79.9485H163.834C157.725 79.9485 153.653 75.892 153.653 69.7583C153.655 63.6693 157.727 59.4933 163.834 59.4933V59.4997Z" fill="#2D2E3B"></Path>
                    <Path d="M142.008 69.7583C142.008 81.8188 150.815 90.363 163.305 90.363H180.004V49.0874H163.305C150.849 49.0874 142.008 57.7127 142.008 69.7583ZM179.257 49.8346V89.6157H163.305C151.205 89.6157 142.755 81.4494 142.755 69.7604C142.755 64.1326 144.797 59.0492 148.516 55.4432C152.236 51.8373 157.492 49.8368 163.316 49.8368L179.257 49.8346Z" fill="#2D2E3B"></Path>
                    <Path d="M128.219 80.9285H139.181V49.0874H128.219V80.9285ZM128.966 49.8346H138.445V80.1812H128.976L128.966 49.8346Z" fill="#2D2E3B"></Path>
                    <Path d="M128.219 94.2208H139.181V84.9124H128.219V94.2208ZM128.966 85.6596H138.445V93.4736H128.976L128.966 85.6596Z" fill="#2D2E3B"></Path>
                    <Path d="M109.484 49.9286C106.545 49.9169 103.663 50.7458 101.179 52.3176V51.3676C101.179 47.5823 104.132 45.2466 107.805 45.2466C110.468 45.2466 113.185 46.3931 113.942 48.5216H124.523C123.057 40.9745 116.736 36.4185 107.705 36.4185C97.1927 36.4185 90.6328 42.6099 90.6328 52.6229V80.9263H98.0442L99.4355 78.2533C102.229 80.6462 105.788 81.9561 109.465 81.9447C118.59 81.9447 125.37 75.0082 125.37 65.9324C125.389 56.7178 118.609 49.9286 109.484 49.9286ZM109.484 81.1996C105.98 81.2214 102.587 79.9739 99.9306 77.6876L99.2179 77.077L97.6024 80.1812H91.3904V52.6229C91.3904 47.926 92.897 44.0147 95.7458 41.3076C98.5947 38.6004 102.739 37.1614 107.696 37.1614C116.006 37.1614 121.874 41.109 123.582 47.7701H114.427C113.294 45.5113 110.353 44.4951 107.797 44.4951C103.529 44.4951 100.424 47.3837 100.424 51.3633V53.6733L101.572 52.9453C103.935 51.4532 106.673 50.6646 109.467 50.6716C113.684 50.6716 117.536 52.2088 120.312 54.9992C123.089 57.7896 124.625 61.6752 124.625 65.9281C124.642 74.6367 118.125 81.1996 109.484 81.1996Z" fill="#2D2E3B"></Path>
                    <Path d="M107.664 58.2124C103.309 58.2124 100.148 61.4597 100.148 65.9346C100.148 70.4095 103.309 73.6205 107.664 73.6205C112.02 73.6205 115.206 70.386 115.206 65.9346C115.206 61.4832 112.035 58.2124 107.664 58.2124ZM107.664 72.8754C103.719 72.8754 100.895 69.9569 100.895 65.9346C100.895 61.8782 103.727 58.9596 107.664 58.9596C111.636 58.9596 114.459 61.8782 114.459 65.9346C114.459 69.9548 111.602 72.8733 107.664 72.8733V72.8754Z" fill="#2D2E3B"></Path>
                    <Path d="M75.7031 94.2208H86.6654V84.9124H75.7031V94.2208ZM76.45 85.6596H85.9185V93.4736H76.4479L76.45 85.6596Z" fill="#2D2E3B"></Path>
                    <Path d="M75.7031 80.9285H86.6654V49.0874H75.7031V80.9285ZM76.45 49.8346H85.9185V80.1812H76.4479L76.45 49.8346Z" fill="#2D2E3B"></Path>
                    <Path d="M69.0612 60.4668C69.0612 53.3915 64.7932 49.0874 57.7511 49.0874H50.2031V58.6948H54.4092C56.7225 58.6948 58.0989 60.0697 58.0989 62.3499V72.4846H50.3802V80.9285H58.3742V90.237H60.6277L74.887 75.0445V72.4825H69.0612V60.4668ZM74.1401 73.2297V74.7499L60.3033 89.4812H59.1211V80.1812H51.1271V73.2297H58.8437V62.3414C58.8437 59.6257 57.1365 57.939 54.4071 57.939H50.9479V49.8261H57.7425C64.3579 49.8261 68.3122 53.7993 68.3122 60.4583V73.2212L74.1401 73.2297Z" fill="#2D2E3B"></Path>
                    <Path d="M32.466 57.0061C27.9847 57.0061 24.5938 60.4498 24.5938 65.0166C24.5938 69.5833 27.9783 72.9992 32.466 72.9992C36.9538 72.9992 40.3362 69.5683 40.3362 65.0166C40.3362 60.4648 36.9538 57.0061 32.466 57.0061ZM32.466 72.252C28.3602 72.252 25.3406 69.1499 25.3406 65.0166C25.3406 60.8832 28.3602 57.7576 32.466 57.7576C36.5718 57.7576 39.5893 60.8619 39.5893 65.0166C39.5893 69.1712 36.5975 72.252 32.466 72.252Z" fill="#2D2E3B"></Path>
                    <Path d="M33.9322 48.0433C30.4426 48.0073 27.0486 49.1836 24.3292 51.3717L23.3903 49.1193H14.9141V80.9604H23.0851L24.2076 78.4945C26.9482 80.7392 30.3905 81.9484 33.9322 81.9105C43.6632 81.9105 50.62 74.8928 50.62 65.0313C50.62 55.1464 43.6632 48.0433 33.9322 48.0433ZM45.3939 76.652C42.5108 79.5662 38.4392 81.1717 33.9322 81.1717C30.5632 81.2089 27.2887 80.0577 24.6835 77.9202L23.9323 77.301L22.605 80.2131H15.661V49.8666H22.8909L24.0241 52.5801L24.7987 51.9524C27.3852 49.8718 30.6135 48.7542 33.9322 48.7905C38.4349 48.7905 42.5044 50.411 45.3917 53.3551C48.279 56.2992 49.8731 60.4496 49.8731 65.042C49.8731 69.6343 48.2833 73.7335 45.4024 76.6541L45.3939 76.652Z" fill="#2D2E3B"></Path>
                    <Path d="M0 94.2208H10.9644V49.0874H0V94.2208ZM0.746897 49.8346H10.2175V93.4736H0.746897V49.8346Z" fill="#2D2E3B"></Path>
                </G>
            </Svg>
            <View style={styles.companyDetails}>
                <Text>Blis Digital</Text>
                <Text>1234 AB, Straat</Text>
                <Text>Tel: 123 456 7890</Text>
            </View>
        </View>

        <View style={styles.header}>
            <View>
                <Text>Invoice No: 0000001</Text>
                <Text>Date: {new Date().toLocaleDateString('en-GB')}</Text>
            </View>
            <View style={styles.section}>
                <Text>Voor:</Text>
                <Text>Naam</Text>
                <Text>Plaats</Text>
                <Text>Straat, 1234 AB</Text>
            </View>
        </View>

        <View style={styles.table}>
            <View style={styles.tableHeader}>
                <Text style={styles.tableColNum}>#</Text>
                <Text style={styles.tableColDesc}>Beschrijving</Text>
                <Text style={styles.tableColQty}>Hoeveelheid</Text>
                <Text style={styles.tableColPrize}>Prijs</Text>
                <Text style={styles.tableColTotal}>Totaal</Text>
            </View>

            {invoiceData.items.map((item: any, index: number) => (
              <View key={index}>
                  <View style={styles.tableRow}>
                        <Text style={styles.tableColNum}>{index + 1}</Text>
                        <Text style={styles.tableColDesc}>{item.name}</Text>
                        <Text style={styles.tableColQty}>{item.quantity}</Text>
                        <Text style={styles.tableColPrize}>{item.price}</Text>
                        <Text style={styles.tableColTotal}>{item.total_price}</Text>
                    </View>

                    {item.additional_info != "" && (
                        <Text style={styles.extraInfo}>{item.additional_info}</Text>
                    )}
                </View>
            ))}
        </View>

        <View style={styles.totalSection}>
            {invoiceData.additional_info && (
                <Text style={styles.extraInfo}>{invoiceData.additional_info}</Text>
            )}
            <Text style={styles.totalText}>Totaal: {invoiceData.total_price}</Text>
        </View>

        <View style={styles.footer}>
            <Text>Bank Name: Lorem Ipsum</Text>
            <Text>Bank Account: 1234567890</Text>
            <Text>If you have any questions, please contact us at blis@digital.com</Text>
        </View>
    </Page>
  </Document>
);

export default InvoicePDF;
