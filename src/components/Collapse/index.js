import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';

const Collapse = (props) => {
  const { title, text, loading, loaderColor="#000" } = props;
  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    setOpen(!open);
  };

  return (
    <View>
        {/* Wrapper del título */}
        <TouchableOpacity onPress={toggleOpen} style={styles.titleWrapper}>
            <Text style={styles.titleText}>{title}</Text>
            <View style={[styles.arrow, open ? styles.arrowUp : styles.arrowDown]} />
        </TouchableOpacity>

        {/* Texto colapsable */}
        {open && (
        <View
            style = {{
                padding: 10
            }}
        >
            {loading &&
            <ActivityIndicator size="large" color={loaderColor} />
            }
            <Text>{text}</Text>
            {
                props.children &&
                props.children
            }
        </View>
        )}
    </View>
  );
};

const styles = {
  titleWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
    backgroundColor: "rgba(0,0,0,.05)",
    padding: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  titleText: {
    fontSize: 16,
  },
  arrow: {
    width: 10,
    height: 10,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    transform: [{ rotate: '-45deg' }],
    borderRadius: 2,
    top: -2,
    // borderLeftColor: 'transparent',
    // borderRightColor: 'transparent',
  },
  arrowDown: {
    borderBottomColor: 'black', // Color de la flecha hacia abajo
  },
  arrowUp: {
    top: 0,
    transform: [{ rotate: '135deg' }],
    borderBottomColor: 'black', // Color de la flecha hacia arriba
  },
};

export default Collapse;
