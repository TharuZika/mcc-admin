'use client';

import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import type { FinanceData } from '@/app/types/finance';

interface FinanceReportProps {
  data: FinanceData;
}

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 30,
  },
  section: {
    margin: 10,
    padding: 10,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    color: '#333333',
  },
  subHeader: {
    fontSize: 18,
    marginBottom: 10,
    color: '#666666',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statBox: {
    padding: 10,
    backgroundColor: '#f3f4f6',
    borderRadius: 5,
    width: '45%',
  },
  statLabel: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 5,
  },
  statValue: {
    fontSize: 16,
    color: '#333333',
  },
  table: {
    width: '100%',
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    paddingVertical: 8,
  },
  tableHeader: {
    backgroundColor: '#f3f4f6',
  },
  tableCell: {
    flex: 1,
    fontSize: 12,
    color: '#333333',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: 'center',
    color: '#666666',
    fontSize: 10,
  },
});

const formatCurrency = (amount: number) => {
  return `LKR ${amount.toFixed(2)}`;
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

const FinanceReport = ({ data }: FinanceReportProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.header}>Financial Report</Text>
        
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Total Revenue</Text>
            <Text style={styles.statValue}>{formatCurrency(data.totalRevenue)}</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Total Bookings</Text>
            <Text style={styles.statValue}>{data.totalBookings}</Text>
          </View>
        </View>

        <Text style={styles.subHeader}>Transaction History</Text>
        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={styles.tableCell}>Order ID</Text>
            <Text style={styles.tableCell}>Date</Text>
            <Text style={styles.tableCell}>Amount</Text>
          </View>
          {data.orderHistory.map((order) => (
            <View key={order.orderId} style={styles.tableRow}>
              <Text style={styles.tableCell}>#{order.orderId}</Text>
              <Text style={styles.tableCell}>{formatDate(order.date)}</Text>
              <Text style={styles.tableCell}>{formatCurrency(order.amount)}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.subHeader}>Revenue Trend Analysis</Text>
        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={styles.tableCell}>Date</Text>
            <Text style={styles.tableCell}>Revenue</Text>
          </View>
          {data.graphData.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableCell}>{formatDate(item.date)}</Text>
              <Text style={styles.tableCell}>{formatCurrency(item.value)}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.footer}>
          Generated on {new Date().toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}
        </Text>
      </View>
    </Page>
  </Document>
);

export default FinanceReport; 